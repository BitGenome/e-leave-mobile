import { TEmployee } from "@/components/EmployeeLeave/components/LeaveCalendar";
import { count, eq, inArray, sql } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { db } from "../database/database";
import {
  employees,
  leaveRequest,
  type leaveStatusType,
} from "../database/schema";
import { getDatesInRange } from "./utils";

export const useLeaveRequests = ({
  status: initialStatus = "pending",
  pageSize = 5,
}: {
  status: leaveStatusType;
  pageSize?: number;
  initialPage?: number;
}) => {
  const [leaveData, setLeaveData] = useState<any[]>([]);
  const [status, setStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getLeaveRequest = useCallback(
    async (page: number) => {
      if (!hasMore || isLoading) return;

      setIsLoading(true);
      try {
        const data = await db.query.leaveRequest.findMany({
          with: {
            leaveType: true,
            employee: true,
            deductedLeaveRequests: true,
          },
          where: eq(leaveRequest.status, status),
          limit: pageSize,
          offset: (page - 1) * pageSize,
          orderBy: (leaveRequest, { desc }) => [desc(leaveRequest.created_at)],
        });

        if (data.length < pageSize) {
          setHasMore(false);
        }

        setLeaveData((prevData) => [...prevData, ...data]);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, status, hasMore, isLoading]
  );

  const loadMore = () => {
    if (hasMore && !isLoading) {
      getLeaveRequest(currentPage + 1);
    }
  };

  const refreshData = () => {
    setLeaveData([]);
    setCurrentPage(1);
    setHasMore(true);
    getLeaveRequest(1);
  };

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [status])
  );

  return { leaveData, loadMore, refreshData, isLoading, hasMore, setStatus };
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

type LeaveAccrual = "annual" | "monthly";
export const summaryLeaveRequest = ({
  status,
  leaveAccrual,
}: {
  status: leaveStatusType;
  leaveAccrual: LeaveAccrual;
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed in JS

  let query;
  if (leaveAccrual === "monthly") {
    query = db
      .select({
        count: count(),
      })
      .from(leaveRequest)
      .where(
        sql`status = ${status} AND 
            strftime('%Y', created_at) = ${currentYear.toString()} AND 
            strftime('%m', created_at) = ${currentMonth
              .toString()
              .padStart(2, "0")}`
      );
  } else {
    // Annual query
    query = db
      .select({
        count: count(),
      })
      .from(leaveRequest)
      .where(
        sql`status = ${status} AND 
            strftime('%Y', created_at) = ${currentYear.toString()}`
      );
  }

  const { data, error } = useLiveQuery(query);

  if (error) throw new Error("Something went wrong");

  const leaveSummary = data?.map(({ count }) => ({
    label: leaveAccrual === "monthly" ? "Monthly" : "Annual",
    count,
  }));

  return leaveSummary ?? [];
};

const STATUS: Record<leaveStatusType, leaveStatusType> = {
  approved: "approved",
  pending: "pending",
  rejected: "rejected",
};
export const comprehensiveLeaveSummary = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed in JS

  const query = db
    .select({
      annualCount: sql<number>`SUM(CASE WHEN strftime('%Y', created_at) = ${currentYear.toString()} AND status =${
        STATUS.approved
      } THEN 1 ELSE 0 END)`,
      monthlyCount: sql<number>`SUM(CASE WHEN strftime('%Y', created_at) = ${currentYear.toString()} AND strftime('%m', created_at) = ${currentMonth
        .toString()
        .padStart(2, "0")} AND status =${STATUS.approved} THEN 1 ELSE 0 END)`,
      pendingCount: sql<number>`SUM(CASE WHEN status = ${STATUS.pending} THEN 1 ELSE 0 END)`,
    })
    .from(leaveRequest);

  const { data, error } = useLiveQuery(query);

  if (error) throw new Error("Something went wrong");

  if (!data || data.length === 0) {
    return [];
  }

  const { annualCount, monthlyCount, pendingCount } = data[0];

  return [
    {
      label: "Annual Leave",
      count: annualCount ?? 0,
    },
    {
      label: "Monthly Leave",
      count: monthlyCount ?? 0,
    },
    {
      label: "Pending Leave",
      count: pendingCount ?? 0,
    },
  ];
};

export interface LeaveDate {
  date: string;
  employees: TEmployee[];
}

/** This function will get the dates where it has an employee leave */
export const getDatesWithCalendar = (props: { year?: number } = {}) => {
  const currentYear = new Date().getFullYear();
  const { year = currentYear } = props;

  const data = useLiveQuery(
    db.query.leaveRequest.findMany({
      columns: {
        id: true,
        start_date: true,
        end_date: true,
        employee_id: true,
      },
      with: {
        employee: true,
      },
      where: sql`status = ${
        STATUS.approved
      } AND strftime('%Y', datetime(start_date, 'unixepoch')) = ${year.toString()}`,
    })
  );

  const dateEmployeeMap: Record<string, TEmployee[]> = {};

  data?.data?.forEach((leave) => {
    const startDate = new Date(leave.start_date);
    const endDate = leave.end_date ? new Date(leave.end_date) : startDate;
    const datesInRange = getDatesInRange(startDate, endDate);

    datesInRange.forEach((date) => {
      const dateString = date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
      if (!dateEmployeeMap[dateString]) {
        dateEmployeeMap[dateString] = [];
      }

      const employee: TEmployee = {
        id: leave.employee?.employee_id ?? 0,
        last_name: leave.employee?.last_name ?? "",
        first_name: leave.employee?.first_name ?? "",
        position: leave.employee.position,
      };

      // Check if employee already exists in the array to avoid duplicates
      if (!dateEmployeeMap[dateString].some((emp) => emp.id === employee.id)) {
        dateEmployeeMap[dateString].push(employee);
      }
    });
  });

  const leaveDates: LeaveDate[] = Object.entries(dateEmployeeMap).map(
    ([date, employees]) => ({
      date,
      employees,
    })
  );

  return leaveDates;
};

export const getEmployeeWithLeaveRequestOnGivenDate = async ({
  employee_id,
}: {
  employee_id: number[];
}) => {
  if (!employee_id) return;
  const query = await db.query.employees.findMany({
    columns: {
      first_name: true,
      last_name: true,
      employee_id: true,
      position: true,
    },
    where: inArray(employees.employee_id, employee_id),
  });

  const data = query?.map((employee) => ({
    id: employee.employee_id,
    ...employee,
  }));
  return data;
};

export const useEmployeeLeaves = ({
  employeeId,
  status,
}: {
  employeeId: number;
  status: leaveStatusType;
}) => {
  const data = useLiveQuery(
    db.query.leaveRequest.findMany({
      with: {
        leaveType: true,
        employee: true,
        deductedLeaveRequests: true,
      },
      where: (leaveRequest, { eq, and }) =>
        and(
          eq(leaveRequest.status, status),
          eq(leaveRequest.employee_id, employeeId)
        ),
    })
  );

  return data;
};
