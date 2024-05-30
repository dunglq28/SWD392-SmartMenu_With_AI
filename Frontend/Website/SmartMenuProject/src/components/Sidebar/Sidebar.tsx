import {
  Avatar,
  Flex,
  Text,
  Icon,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import style from "./Sidebar.module.scss";
import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link as ReactRouterLink } from "react-router-dom";
import Logo from "../../assets/images/Logo.jpeg";
import { AiOutlineProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { IoGitBranchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdListAlt } from "react-icons/md";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [item, setItem] = useState("Dashboard");

  const changeItem = (label: string) => {
    setItem(label);
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menuItems = [
    { icon: GoHome, label: "Dashboard", to: "/dashboard" },
    { icon: AiOutlineUser, label: "User", to: "/user" },
    { icon: IoGitBranchOutline, label: "Branch", divider: true, to: "/branch" },
    { icon: AiOutlineProduct, label: "Products", to: "/product" },
    { icon: MdListAlt, label: "Menu", to: "/menu" },
    {
      icon: IoSettingsOutline,
      label: "Settings",
      divider: true,
      to: "/setting",
    },
    { icon: CgAddR, label: "New Product", to: "/new" },
  ];

  return (
    <Flex
      className={style.Sidebar}
      width={isExpanded ? "250px" : "65px"}
      direction="column"
    >
      <Flex>
        <Flex className={style.Logo}>
          <Avatar src={Logo} className={style.Avatar} />
          {isExpanded && <Text className={style.LogoText}>Smart Menu</Text>}
        </Flex>
        <IoIosArrowForward
          className={style.ArrowSidebar}
          onClick={toggleSidebar}
          style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
        />
      </Flex>

      <Flex className={style.MenuItems} direction="column">
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ChakraLink
              as={ReactRouterLink}
              to={menuItem.to}
              className={style.MenuItem}
              style={{ textDecoration: "none" }}
              onClick={() => changeItem(menuItem.label)}
              border={
                item == menuItem.label
                  ? "1px solid #19d1c4"
                  : "1px solid #F4F7F6"
              }
              backgroundColor={item == menuItem.label ? "#b9d7d5" : "#f4f7f6"}
            >
              <Icon as={menuItem.icon} className={style.MenuIcon} />
              {isExpanded && (
                <Text className={style.MenuText}>{menuItem.label}</Text>
              )}
            </ChakraLink>
            {menuItem.divider && <Divider />}
          </React.Fragment>
        ))}
      </Flex>

      <Flex className={style.Profile}>
        <MdLogout className={style.LogoutIcon} />
        {isExpanded && <Text className={style.LogoutText}>Logout</Text>}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
