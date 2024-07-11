import { Card, Flex, Image, Text } from "@chakra-ui/react";
import style from "./MenuCard.module.scss";
import FakeMenu from "../../../assets/images/menu/menuImg.png";
import { MenuData } from "../../../payloads/responses/MenuData.model";
import moment from "moment";

interface MenuCardProps {
  menu: MenuData;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => (
  <Flex className={style.Card}>
    <Card className={style.MenuCard}>
      <Image src={FakeMenu} alt="Menu thông minh"/>
      {/* <Image src={menu.imageUrl} alt="Menu thông minh"/> */}
      <Flex className={style.MenuCardTitle}>
        <Text className={style.Description}>{menu.description}</Text>
        {/* <Flex columnGap="10px">
          <Text as="b">Độ ưu tiên:</Text>
          <Text>1</Text>
        </Flex> */}
        <Flex columnGap="10px">
          <Text as="b">Ngày tạo:</Text>
          <Text>{moment(menu.createDate).format("DD/MM/YYYY")}</Text>
        </Flex>
      </Flex>
    </Card>
  </Flex>
);

export default MenuCard;
