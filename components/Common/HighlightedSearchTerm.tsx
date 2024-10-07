import { Text, useTheme } from "react-native-paper";
import { TextPoppinsBold } from "../Text/TextPoppinsBold";
import { TextPoppinsRegular } from "../Text/TextPoppinsRegular";

export const HighlightedText = ({
  name,
  searchTerm,
}: {
  name: string;
  searchTerm: string;
}) => {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = name.split(regex);
  const theme = useTheme();
  return (
    <TextPoppinsRegular>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <TextPoppinsBold
            style={{
              color: theme.colors.primary,
            }}
            key={index}
          >
            {part}
          </TextPoppinsBold>
        ) : (
          part
        )
      )}
    </TextPoppinsRegular>
  );
};
