/**
 *
 * @param data  The data array to map
 * @param labelKey The label for maptions
 * @param valueKey  The value of label
 * @returns [{label, value}]
 */
export const mapOptions = <T>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
) => {
  return (
    data?.map((item) => ({
      label: String(item[labelKey]), // Ensure label is a string
      value: item[valueKey], // Ensure value is a string (you can change this type if needed)
    })) || []
  );
};
