import React from "react";
import {
  Button,
  Card,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import style from "./Menu.module.scss";
import MenuCard from "../../components/Menu/MenuCard";

function Menu() {
  const menuData = [
    {
      title: "Thực đơn cho các ngày lễ",
      description:
        "Menu được sử dụng cho các ngày lễ như Tết, Giáng sinh, Trung thu và nhiều dịp khác.",
      createDate: "10/06/2024",
      updateDate: "03/07/2024",
    },
    {
      title: "Thực đơn cho các ngày lễ",
      description:
        "Menu được sử dụng cho các ngày lễ như Tết, Giáng sinh, Trung thu và nhiều dịp khác.",
      createDate: "10/06/2024",
      updateDate: "03/07/2024",
    },
    {
      title: "Thực đơn cho các ngày lễ",
      description:
        "Menu được sử dụng cho các ngày lễ như Tết, Giáng sinh, Trung thu và nhiều dịp khác.",
      createDate: "10/06/2024",
      updateDate: "03/07/2024",
    },
    {
      title: "Thực đơn cho các ngày lễ",
      description:
        "Menu được sử dụng cho các ngày lễ như Tết, Giáng sinh, Trung thu và nhiều dịp khác.",
      createDate: "10/06/2024",
      updateDate: "03/07/2024",
    },
  ];

  return (
    <Flex className={style.Container}>
      <Flex>
        <ChakraLink
          as={ReactRouterLink}
          to="/menu/create-menu"
          className={style.MenuItem}
          style={{ textDecoration: "none" }}
        >
          <Button>Tạo menu</Button>
        </ChakraLink>
      </Flex>
      <Flex className={style.CardContainer}>
        {menuData.map((menu, index) => (
          <MenuCard
            key={index}
            title={menu.title}
            description={menu.description}
            createDate={menu.createDate}
            updateDate={menu.updateDate}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default Menu;
