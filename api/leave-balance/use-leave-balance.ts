import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { leaveBalances } from "../database/schema";
import { eq } from "drizzle-orm";

export const useLeaveBalanceData = () => {
  const data = useLiveQuery(db.select().from(leaveBalances));

  return data;
};

export const useLeaveBalanceDataByEmployee = ({ id }: { id: number }) => {
  const leaveBalancesData = useLiveQuery(
    db.query.leaveBalances.findMany({
      where: eq(leaveBalances.employee_id, id),
      with: {
        leaveType: true,
        employee: true,
      },
    })
  );

  const resultData = leaveBalancesData.data?.map((balances) => {
    const {
      available_days,
      leaveType: { max_days },
    } = balances;
    /**convert available balance to 0-1 example 0.7 */
    let remaining_balance = 0;
    if (available_days) {
      remaining_balance = available_days / max_days;
    }

    return {
      remaining_balance,
      ...balances,
    };
  });
  return {
    ...leaveBalancesData,
    data: resultData,
  };
};
