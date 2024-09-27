import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { employees } from "../database/schema";

interface Employee {
  firstname: string;
  lastname: string;
  employee_no: string;
  position: string;
}

export const addEmployee = async (props: Employee) => {
  const { firstname, lastname } = props;

  const result = await db
    .insert(employees)
    .values({ first_name: firstname, last_name: lastname, ...props });

  if (!result) throw Error;

  return result;
};

export const getAllEmployee = async () => {
  return await db.select().from(employees);
};

export const getEmployee = async (employee_id: number) => {
  return await db
    .select()
    .from(employees)
    .where(eq(employees.employee_id, employee_id));
};
