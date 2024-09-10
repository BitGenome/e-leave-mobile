import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";

interface INavigationHeaderTitle {
  title: string;
}

export default function NavigationHeaderTitle(props: INavigationHeaderTitle) {
  return <TextPoppinsBold>{props.title}</TextPoppinsBold>;
}
