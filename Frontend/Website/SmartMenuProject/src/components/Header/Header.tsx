import { Flex, Text } from "@chakra-ui/react";
import style from "./Header.module.scss";

function Header() {
  return (
    <Flex className={style.Header}>
      <Text>abc</Text>
      <Text>xyz</Text>
    </Flex>
  );
}

export default Header;
