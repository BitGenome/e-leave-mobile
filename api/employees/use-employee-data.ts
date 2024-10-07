import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../database/database";
import { employees } from "../database/schema";
import { like, or } from "drizzle-orm";

export const useEmployeeData = () => {
  const data = useLiveQuery(db.select().from(employees));

  return { data: data.data, error: data.data, isLoading: !data };
};

export const useSearchEmployee = (searchTerm: string) => {
  const data = useLiveQuery(
    db
      .select()
      .from(employees)
      .where(
        or(
          like(employees.first_name, `%${searchTerm}%`),
          like(employees.last_name, `%${searchTerm}%`)
        )
      ),
    [searchTerm]
  );
  return { isLoading: !data, data: data.data, error: data.error };
};
