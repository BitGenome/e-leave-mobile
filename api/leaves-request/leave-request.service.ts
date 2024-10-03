import { type ApplyLeaveInputProps } from "@/components/Forms/ApplyLeave";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";
import { and, eq } from "drizzle-orm";
import { db } from "../database/database";
import { leaveBalances, leaveRequest, leaveType } from "../database/schema";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

type LeaveDuration = "full_day" | "halfday_morning" | "halfday_afternoon";
export const requestLeave = async (data: ApplyLeaveInputProps) => {
  const { end_date, start_date, leave_duration, leave_type, employee } = data;

  // Fetch the leave balance
  const balance = await db.query.leaveBalances.findFirst({
    with: {
      leaveType: true,
    },
    where: eq(leaveType.id, +leave_type),
  });

  if (!balance) {
    throw new Error("Leave balance not found for the specified leave type.");
  }

  const available_balance = balance.available_days ?? 0;

  // Calculate the number of days requested
  let daysRequested: number;

  if (!end_date) {
    // For half-day leaves
    daysRequested = leave_duration.includes("half") ? 0.5 : 1;
  } else {
    // For full-day leaves
    const startDate = new Date(start_date as Date);
    const endDate = new Date(end_date);
    const timeDiff = endDate.getTime() - startDate.getTime();
    daysRequested = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
  }

  // Check if the requested days exceed the available balance
  if (daysRequested > available_balance) {
    throw new Error(
      `Insufficient leave balance. Available: ${balance.available_days} days, Requested: ${daysRequested} days.`
    );
  }

  const leaveRequestData = {
    employee_id: +employee,
    leave_type_id: +leave_type,
    deducted_leave_type_id: +leave_type,
    start_date,
    end_date: end_date,
    leave_duration: data.leave_duration,
    remark: data.remarks,
  };
  // If we've reached this point, the leave request is valid
  // Proceed with saving the leave request to the database

  const newLeaveRequest = await db
    .insert(leaveRequest)
    //@ts-ignore
    .values(leaveRequestData)
    .returning({ insertedId: leaveRequest.id });

  return newLeaveRequest;
};

export const LeaveRequestApproveOrReject = async (
  requestId: number,
  isApprove: boolean
) => {
  if (!isApprove) {
    // Handle rejection logic here if needed

    try {
      await db
        .update(leaveRequest)
        .set({ status: "rejected" })
        .where(eq(leaveRequest.id, requestId));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error:${error.message}`);
      }
      throw new Error(`Error: ${error}`);
    }
    return;
  }

  try {
    // Fetch the leave request details
    const request = await db.query.leaveRequest.findFirst({
      where: eq(leaveRequest.id, requestId),
      with: {
        leaveType: true,
      },
    });

    if (!request) {
      throw new Error("Leave request not found");
    }

    // Calculate the deduction amount based on start_date, end_date, and leave_duration
    const deductionAmount = calculateDeductionAmount(
      request.start_date,
      request.end_date,
      request.leave_duration as LeaveDuration
    );

    // Fetch the current leave balance
    const currentBalance = await db.query.leaveBalances.findFirst({
      where: and(
        eq(leaveBalances.employee_id, request.employee_id),
        eq(leaveBalances.leave_type_id, request.deducted_leave_type_id)
      ),
    });

    if (!currentBalance) {
      throw new Error("Leave balance not found");
    }

    // Check if the employee has enough balance
    if (currentBalance.available_days < deductionAmount) {
      throw new Error("Insufficient leave balance");
    }

    // Check if the request exceeds the maximum allowed days
    if (
      request.leaveType.max_days &&
      deductionAmount > request.leaveType.max_days
    ) {
      throw new Error("Leave request exceeds maximum allowed days");
    }

    // Update the leave balance
    const newBalance = currentBalance.available_days - deductionAmount;
    await db
      .update(leaveBalances)
      .set({ available_days: newBalance })
      .where(eq(leaveBalances.id, currentBalance.id));

    // Update the leave request status to approved
    await db
      .update(leaveRequest)
      .set({ status: "approved" })
      .where(eq(leaveRequest.id, requestId));
  } catch (error) {
    console.error("Error in LeaveRequestApproveOrReject:", error);
    throw new Error(`Failed to process leave request: ${error}`);
  }
};

function calculateDeductionAmount(
  start_date: Date,
  end_date: Date | null,
  leave_duration: LeaveDuration
): number {
  const start = dayjs(start_date);
  const end = dayjs(end_date);

  if (start.isSame(end, "day")) {
    // Single day leave
    return leave_duration === "full_day" ? 1 : 0.5;
  } else {
    // Multi-day leave
    let days = 0;
    let current = start;

    while (current.isSameOrBefore(end, "day")) {
      if (current.weekday() !== 0 && current.weekday() !== 6) {
        // Not Saturday or Sunday
        days += 1;
      }
      current = current.add(1, "day");
    }

    if (leave_duration !== "full_day") {
      // For half-day leaves spanning multiple days, we subtract 0.5
      days -= 0.5;
    }

    return days;
  }
}
