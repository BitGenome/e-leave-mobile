import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { employees, leaveRequest } from "../database/schema";

export const useEmployeeData = () => {
  const data = useLiveQuery(db.select().from(employees));

  return data;
};
