import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { leaveBalances } from "../database/schema";
import { eq } from "drizzle-orm";

export const useLeaveBalanceData = () => {
  const data = useLiveQuery(db.select().from(leaveBalances));

  return data;
};

export const useLeaveBalanceDataByEmployee = ({ id }: { id: number }) => {
  const data = useLiveQuery(
    db.query.leaveBalances.findMany({
      where: eq(leaveBalances.employee_id, id),
      with: {
        leaveType: true,
        employee: true,
      },
    })
  );

  return data;
};
