import { type LeaveBalanceFormInput } from "@/app/(app)/settings/annual-leave";
import { db } from "../database/database";
import {
  leaveBalances as LeaveBalanceSchema,
  leaveBalances,
} from "../database/schema";
import { getAllEmployee } from "../employees/employee.service";
import { eq } from "drizzle-orm";

interface LeaveBalanceProps {
  employee?: number;
  leaveBalances: LeaveBalanceFormInput;
}

export const addLeaveBalance = async (data: LeaveBalanceProps) => {
  const { leaveBalances, employee } = data;

  if (!employee) {
    const employees = await getAllEmployee();
    const dataToInsert = employees.flatMap((emdata) =>
      leaveBalances.leaveTypes.map((leaveType) => ({
        employee_id: emdata.employee_id, // Get employee_id
        leave_type_id: leaveType.id, // Get leave_type_id from leaveBalances
        available_days: leaveType.balance, // Include balance from leaveBalances
      }))
    );

    await db.insert(LeaveBalanceSchema).values(dataToInsert);
    return;
  }
  const dataToInsertEmployee = leaveBalances.leaveTypes.map((leaveType) => ({
    employee_id: employee, // Get employee_id
    leave_type_id: leaveType.id, // Get leave_type_id from leaveBalances
    available_days: leaveType.balance, // Include balance from leaveBalances
  }));

  await db.insert(LeaveBalanceSchema).values(dataToInsertEmployee);
  return;
};

export const getEmployeeBalance = async ({ id }: { id: number }) => {
  const leaveBalancesData = await db.query.leaveBalances.findMany({
    where: eq(leaveBalances.employee_id, id),
    with: {
      leaveType: true,
    },
  });

  return leaveBalancesData;
};
