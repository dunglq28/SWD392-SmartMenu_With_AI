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

import ModalForm from "../Modals/ModalForm/ModalForm";
import ModalFormBrand from "../Modals/ModalFormBrand/ModalFormBrand";
import ModalFormUser from "../Modals/ModalFormUser/ModalFormUser";
import ModalFormStore from "../Modals/ModalFormStore/ModalFormStore";
import { CurrentForm } from "../../constants/Enum";
import { BrandData } from "../../models/Brand.model";
import { UserForm } from "../../models/User.model";
import { createUser } from "../../services/UserService";
import { toast } from "react-toastify";
import { createBrand } from "../../services/BrandService";
import { getInitialUserData } from "../../utils/initialUserData";

function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [item, setItem] = useState("");
  const [formPrevious, setFormPrevious] = useState(CurrentForm.BRAND);

  //BRAND DATA
  const [brandData, setBrandData] = useState<BrandData>({
    brandName: {
      value: "",
      errorMessage: "",
    },
    image: {
      value: null,
      errorMessage: "",
    },
  });

  // USER DATA
  const [userData, setUserData] = useState<UserForm>(getInitialUserData());

  const {
    isOpen: isOpenBrand,
    onOpen: onOpenBrand,
    onClose: onCloseBrand,
  } = useDisclosure();
  const {
    isOpen: isOpenStore,
    onOpen: onOpenStore,
    onClose: onCloseStore,
  } = useDisclosure();
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure();

  const changeItem = (label: string) => {
    setItem(label);
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menuItems = [
    { icon: GoHome, label: t("dashboard"), to: "/dashboard" },
    { icon: AiOutlineUser, label: t("users"), to: "/users" },
    {
      icon: IoGitBranchOutline,
      label: t("brands"),
      divider: true,
      to: "/brands",
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
      label: t("new brand"),
      onclick: onOpenBrand,
    },
    {
      icon: CgAddR,
      label: t("new branch"),
      onclick: onOpenStore,
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

  function nextHandler(currentForm: CurrentForm) {
    if (currentForm === CurrentForm.BRAND) {
      onCloseBrand();
      setFormPrevious(CurrentForm.BRAND);
    } else {
      onCloseStore();
      setFormPrevious(CurrentForm.STORE);
    }
    setTimeout(() => {
      onOpenUser();
    }, 350);
  }

  const updateBrandData = (data: BrandData) => {
    setBrandData(data);
  };

  const updateUserData = (data: UserForm) => {
    setUserData(data);
  };

  async function saveBrandHandle(data: UserForm) {
    try {
      setUserData(data);
      const brandForm = new FormData();

      if (brandData.image.value && brandData.brandName.value) {
        brandForm.append("BrandName", brandData.brandName.value);
        brandForm.append("Image", brandData.image.value);
      }

      const userResult = await createUser(data, 2);

      if (userResult.statusCode === 200) {
        brandForm.append("UserId", userResult.data.toString());

        const brandResult = await createBrand(brandForm);

        if (brandResult.statusCode === 200) {
          await onCloseUser();
          const toastMessage = "Thêm thương hiệu mới thành công";
          navigate("/brands", { state: { toastMessage } });
        }
      }
    } catch {
      toast.error("Tên thương hiệu đã tồn tại");
    }
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
        formBody={
          <ModalFormBrand
            brandData={brandData}
            onClose={onCloseBrand}
            updateBrandData={updateBrandData}
            nextHandler={() => nextHandler(CurrentForm.BRAND)}
            isEdit={false}
          />
        }
        onClose={onCloseBrand}
        isOpen={isOpenBrand}
        title={t("Add New Brand")}
        updateBrandData={updateBrandData}
      />

      <ModalForm
        formBody={
          <ModalFormStore
            onClose={onCloseStore}
            updateBrandData={updateBrandData}
            nextHandler={() => nextHandler(CurrentForm.STORE)}
          />
        }
        onClose={onCloseStore}
        isOpen={isOpenStore}
        title={t("Add New Branch")}
      />

      <ModalForm
        formBody={
          <ModalFormUser
            isEdit={false}
            onClose={onCloseUser}
            formPrevious={formPrevious}
            onOpenStore={onOpenStore}
            onOpenBrand={onOpenBrand}
            updateBrandData={updateBrandData}
            updateUserData={updateUserData}
            saveBrandHandle={saveBrandHandle}
            brandName={brandData.brandName.value}
            userData={userData}
          />
        }
        onClose={onCloseUser}
        isOpen={isOpenUser}
        title={t("Add New User")}
        updateBrandData={updateBrandData}
      />
    </Flex>
  );
}

export default Sidebar;
