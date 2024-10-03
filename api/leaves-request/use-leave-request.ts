import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { and, eq, sql } from "drizzle-orm";
import {
  leaveBalances,
  leaveRequest,
  type leaveStatusType,
} from "../database/schema";

export const useLeaveRequest = ({ status }: { status: leaveStatusType }) => {
  const data = useLiveQuery(
    db.query.leaveRequest.findMany({
      with: {
        leaveType: true,
        employee: true,
        deductedLeaveRequests: true,
      },
      where: eq(leaveRequest.status, status),
    })
  );
  return data;
};

export const useLeaveRequestId = ({ id }: { id: number }) => {
  const data = useLiveQuery(
    db.query.leaveRequest.findFirst({
      with: {
        leaveType: true,
        employee: true,
        deductedLeaveRequests: true,
      },
      where: eq(leaveRequest.id, id),
    })
  );
  return data;
};

export const monthlyPendingLeaveRequestCount = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed in JS

  console.log("month", currentMonth);
  console.log("year", currentYear);

  const data = useLiveQuery(
    db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(leaveRequest)
      .where(
        and(
          eq(leaveRequest.status, "pending"),
          sql`strftime('%Y', datetime(${leaveRequest.created_at} / 1000, 'unixepoch')) = ${currentYear}`, // Convert to seconds
          sql`strftime('%m', datetime(${leaveRequest.created_at} / 1000, 'unixepoch')) = ${currentMonth}` // Convert to seconds
        )
      )
  );
  console.log(data);
  return data ? data.data[0]?.count : 0;
};
