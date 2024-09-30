import { type LeaveTypeInputProps } from "@/app/(app)/settings/leave-type";
import { db } from "../database/database";
import { leaveType } from "../database/schema";
import { eq } from "drizzle-orm";

interface EditLeaveTypeProps extends LeaveTypeInputProps {
  id: number;
}

export const addLeaveType = async (data: LeaveTypeInputProps) => {
  const { description, name } = data;
  await db
    .insert(leaveType)
    .values({ leave_name: name, leave_description: description, ...data });
};

export const editLeavetype = async (data: EditLeaveTypeProps) => {
  await db.update(leaveType).set(data).where(eq(leaveType.id, data.id));
};
