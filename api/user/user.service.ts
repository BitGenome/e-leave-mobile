import { type RegisterInputProps } from "@/components/Forms/Auth/Register";
import { and, eq } from "drizzle-orm";
import { db } from "../database/database";
import { users } from "../database/schema";

export const registerUser = async (data: RegisterInputProps) => {
  const { password, username } = data;

  try {
    const isAlreadyExist = await db.query.users.findFirst();

    if (!!isAlreadyExist)
      throw new Error(
        "You can't register another user. Please use your prevous register user to login."
      );

    await db
      .insert(users)
      .values({ username: username, password_hash: password });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error("Unexpected Error.");
  }
};

export const loginUser = async (
  data: Omit<RegisterInputProps, "confirm_password">
) => {
  const { username, password } = data;

  const user = await db.query.users.findFirst({
    where: and(eq(users.username, username), eq(users.password_hash, password)),
  });
  if (!user) throw Error("user not found");

  return {
    user: {
      id: user.id,
      username: user.username,
    },
  };
};
