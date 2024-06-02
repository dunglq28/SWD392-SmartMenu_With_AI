import { Flex, Link, Text } from "@chakra-ui/react";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <Flex className={style.Footer}>
      <Text>2024 © SmartMenu With AI.</Text>
      <Link style={{ textDecoration: "none" }} className={style.LinkText}>
        Privacy
      </Link>
      <Link style={{ textDecoration: "none" }} className={style.LinkText}>
        Terms
      </Link>
      <Link style={{ textDecoration: "none" }} className={style.LinkText}>
        Help
      </Link>
    </Flex>
  );
}

export default Footer;
