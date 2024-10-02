import { type ApplyLeaveInputProps } from "@/components/Forms/ApplyLeave";
import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { leaveRequest, leaveType } from "../database/schema";

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

  // If we've reached this point, the leave request is valid
  // Proceed with saving the leave request to the database
  const newLeaveRequest = await db
    .insert(leaveRequest)
    .values({
      employee_id: +employee,
      leave_type_id: +leave_type,
      deducted_leave_type_id: +leave_type,
      start_date,
      end_date: end_date, // Use start_date for half-day leaves
      status: "pending",
      leave_duration: data.leave_duration,
      remark: data.remarks,
    })
    .returning({ insertedId: leaveRequest.id });

  return newLeaveRequest;
};
