import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const dateFormatter = (date: Date) => {
  return dayjs.utc(date).format("D MMMM YYYY");
};
