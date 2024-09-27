import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
const expo = openDatabaseSync("leavease.db", { enableChangeListener: true });

export const db = drizzle(expo);
