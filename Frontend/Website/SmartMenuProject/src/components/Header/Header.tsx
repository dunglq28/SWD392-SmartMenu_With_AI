import { Avatar, Flex, Input, Text } from "@chakra-ui/react";
import style from "./Header.module.scss";
import { useLocation } from "react-router-dom"; // Import useLocation từ react-router-dom
import { useTranslation } from "react-i18next";

function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const pathname = location.pathname;

  const formattedPathname = pathname.replace("/", "");
  const translatedPathname = t(formattedPathname).toUpperCase();

  return (
    <Flex className={style.Header}>
      <Text className={style.PathName}>{translatedPathname}</Text>
      <Flex w="40%" justifyContent="space-between" alignItems="center">
        <Input
          width="60%"
          placeholder={t("Search...")}
          border="1px solid black"
        />
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </Flex>
    </Flex>
  );
}

export default Header;
