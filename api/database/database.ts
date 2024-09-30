import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

import * as schema from "./schema";

const expo = openDatabaseSync("leavease.db", {
  enableChangeListener: true,
});

export const db = drizzle(expo, { schema });
