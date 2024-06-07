import {
  Avatar,
  Flex,
  Text,
  Icon,
  Divider,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import style from "./Sidebar.module.scss";
import React, { useState, useEffect } from "react";
import { CgAddR } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Logo from "../../assets/images/Logo.jpeg";
import { AiOutlineProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { IoGitBranchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdListAlt } from "react-icons/md";

import { useTranslation } from "react-i18next";
import { themeColors } from "../../constants/GlobalStyles";
import CustomButton from "../CustomButton/CustomButton";
import ModalFormUser from "../ModalFormUser/ModalFormUser";
import ModalForm from "../ModalForm/ModalForm";

function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [item, setItem] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeItem = (label: string) => {
    setItem(label);
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menuItems = [
    { icon: GoHome, label: t("dashboard"), to: "/dashboard" },
    { icon: AiOutlineUser, label: t("users"), to: "/users" },
    {
      icon: IoGitBranchOutline,
      label: t("branchs"),
      divider: true,
      to: "/branchs",
    },
    { icon: AiOutlineProduct, label: t("products"), to: "/products" },
    { icon: MdListAlt, label: t("menu"), to: "/menu" },
    {
      icon: IoSettingsOutline,
      label: t("settings"),
      divider: true,
      to: "/settings",
    },
    { icon: CgAddR, label: t("new product"), to: "/new" },
    {
      icon: CgAddR,
      label: t("new branch"),
      onclick: onOpen,
    },
  ];

  useEffect(() => {
    const currentItem = menuItems.find(
      (menuItem) => menuItem.to === location.pathname
    );
    if (currentItem) {
      setItem(currentItem.label);
    }
  }, [location.pathname, menuItems]);

  function logoutHandler() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    navigate("/login");
  }

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
          style={{
            transform: `rotate(${isExpanded ? 180 : 0}deg)`,
            color: "#fff",
          }}
        />
      </Flex>

      <Flex className={style.MenuItems} direction="column">
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ChakraLink
              as={menuItem.to ? ReactRouterLink : "button"}
              {...(menuItem.to ? { to: menuItem.to } : {})}
              className={style.MenuItem}
              style={{ textDecoration: "none" }}
              onClick={
                menuItem.to
                  ? () => changeItem(menuItem.label)
                  : menuItem.onclick
              }
              backgroundColor={item === menuItem.label ? "#5D5FEF" : "#fff"}
              color={item === menuItem.label ? "#fff" : "black"}
            >
              <Flex>
                <Icon as={menuItem.icon} className={style.MenuIcon} />
                {isExpanded && (
                  <Text className={style.MenuText}>{menuItem.label}</Text>
                )}
              </Flex>
            </ChakraLink>
            {menuItem.divider && <Divider />}
          </React.Fragment>
        ))}
      </Flex>

      <Flex className={style.Profile} onClick={logoutHandler}>
        <MdLogout className={style.LogoutIcon} />
        {isExpanded && <Text className={style.LogoutText}>Logout</Text>}
      </Flex>

      <ModalForm
        formBody={<ModalFormUser />}
        onClose={onClose}
        isOpen={isOpen}
        title={t("Add New Branch")}
      />
    </Flex>
  );
}

export default Sidebar;
