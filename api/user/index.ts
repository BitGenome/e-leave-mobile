import { db } from "../database/database";
import { users } from "../database/schema";

export const usersData = await db.select().from(users);
