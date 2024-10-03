import dayjs from "dayjs";

export const dateFormatter = (date: Date) => {
  return dayjs(date).format("D MMMM YYYY");
};
