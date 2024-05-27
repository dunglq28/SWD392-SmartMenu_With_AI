import { Avatar, Flex, Text, Icon, Divider } from "@chakra-ui/react";
import style from "./Sidebar.module.scss";
import React, { useState } from "react";
import {
  FaHome,
  FaCodeBranch,
  FaClipboardList,
  FaConciergeBell,
  FaCog,
  FaTag,
} from "react-icons/fa";
import Logo from "../../assets/images/Logo.jpeg";
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";
import { CgAddR } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

function Sidebar() {
  const [hamburger, setHamburger] = useState(true);

  const toggleSidebar = () => {
    setHamburger(!hamburger);
  };

  const menuItems = [
    { icon: FaHome, label: "Home", to: "/home" },
    { icon: FaTag, label: "Products", to: "/products" },
    { icon: FaCodeBranch, label: "Branch", divider: true, to: "/branch" },

    { icon: FaCartShopping, label: "Sales", to: "/sales" },
    { icon: FaClipboardList, label: "Menu", to: "/menu" },
    {
      icon: FaConciergeBell,
      label: "Services",
      divider: true,
      to: "/services",
    },

    { icon: HiMiniChatBubbleBottomCenterText, label: "Chat", to: "/home" },
    { icon: FaCog, label: "Settings", divider: true, to: "/settings" },

    { icon: CgAddR, label: "New Product", to: "/new" },
  ];

  return (
    <Flex
      className={style.Sidebar}
      width={hamburger ? "250px" : "65px"}
      direction="column"
    >
      <Flex>
        <Flex className={style.Logo}>
          <Avatar src={Logo} className={style.Avatar} />
          <Text className={style.LogoText}>
            {hamburger ? "Smart Menu" : null}
          </Text>
        </Flex>
        <IoIosArrowForward
          className={style.ArrowSidebar}
          onClick={toggleSidebar}
          style={{ transform: `rotate(${hamburger ? 180 : 0}deg)` }}
        />
      </Flex>
      {/* <Flex className={style.HamburgerArea}>
        <RxHamburgerMenu
          onClick={toggleSidebar}
          className={style.HamburgerIcon}
        />
      </Flex> */}

      <Flex className={style.MenuItems} direction="column">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ChakraLink
              as={ReactRouterLink}
              to={item.to}
              className={style.MenuItem}
              style={{ textDecoration: "none" }} //phải css inline vì những cách khác kh hoạt động ?
            >
              <Icon as={item.icon} className={style.MenuIcon} />
              {hamburger ? (
                <Text className={style.MenuText}>{item.label}</Text>
              ) : null}
            </ChakraLink>
            {item.divider ? <Divider /> : null}
          </React.Fragment>
        ))}
      </Flex>

      <Flex className={style.Profile}>
        <Flex>
          <MdLogout className={style.LogoutIcon} />
          {hamburger ? <Text className={style.LogoutText}>Logout</Text> : null}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
