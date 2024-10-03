import { Employee } from "@/components/Leaves/components/LeaveCard";

export const nameFormatter = ({
  first_name,
  last_name,
}: Pick<Employee, "first_name" | "last_name">) => {
  if (!first_name && !last_name) return "";

  const formattedName = [];

  if (first_name) {
    formattedName.push(first_name);
  }

  if (last_name) {
    formattedName.push(last_name);
  }

  return formattedName.join(" ");
};
