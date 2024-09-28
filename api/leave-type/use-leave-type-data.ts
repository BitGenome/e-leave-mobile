import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { leaveType } from "../database/schema";

export const useLeaveTypeData = () => {
  const data = useLiveQuery(db.select().from(leaveType));

  return data;
};
