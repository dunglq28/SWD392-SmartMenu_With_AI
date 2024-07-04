import { Card, Flex, Image, Text } from "@chakra-ui/react";
import style from "./MenuCard.module.scss";
import FakeMenu from "../../../assets/images/menu/menuImg.svg";

interface MenuCardProps {
  title: string;
  description: string;
  createDate: string;
  updateDate: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  createDate,
  updateDate,
}) => (
  <Flex className={style.Card}>
    <Card className={style.MenuCard}>
      <Image src={FakeMenu} />
      <Flex className={style.MenuCardTitle}>
        <Text className={style.Title}>{title}</Text>
        <Text className={style.Description}>{description}</Text>
        <Flex columnGap="10px">
          <Text as="b">Ngày tạo:</Text>
          <Text>{createDate}</Text>
        </Flex>
        <Flex columnGap="10px">
          <Text as="b">Cập nhật:</Text>
          <Text>{updateDate}</Text>
        </Flex>
      </Flex>
    </Card>
  </Flex>
);

export default MenuCard;
