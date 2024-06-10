import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ResponsiveValue,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import style from "./Header.module.scss";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRegBell } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import i18n from "../../i18n/i18n";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const pathname = location.pathname;

  const formattedPathname = pathname.replace("/", "");
  const translatedPathname = t(formattedPathname).toUpperCase();

  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage === "vi" ? "vi" : "en";
  };

  const [language, setLanguage] = useState<"en" | "vi">(getInitialLanguage());

  const changeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleLanguageChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      const selectedLanguage = selectedOption.value === "en" ? "en" : "vi";
      changeLanguage(selectedLanguage);
    }
  };

  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    changeLanguage(initialLanguage);
  }, []);

  const languageOptions = [
    { value: "en", label: "Eng (US)" },
    { value: "vi", label: "Vi (VN)" },
  ];

  type PositionValue =
    | "relative"
    | "sticky"
    | "absolute"
    | "fixed"
    | "static"
    | "initial"
    | "inherit";

  const getInitialHeaderSticky = () => {
    const savedHeaderSticky = localStorage.getItem("header-sticky");
    return savedHeaderSticky === "sticky" ? "sticky" : "relative";
  };

  const [headerSticky, setHeaderSticky] = useState<
    ResponsiveValue<PositionValue>
  >(getInitialHeaderSticky());

  return (
    <Flex className={style.Header} position={headerSticky}>
      <Flex flexDirection="column">
        <Breadcrumb
          spacing="1px"
          separator={<ChevronRightIcon color="gray.500" />}
          fontSize="13px"
        >
          <BreadcrumbItem>
            <BreadcrumbLink href={formattedPathname}>
              {formattedPathname}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text className={style.PathName}>{translatedPathname}</Text>
      </Flex>
      <Flex className={style.Content}>
        <Input
          className={style.SearchInput}
          placeholder={t("Search here...")}
        />
        <Flex className={style.Actions}>
          <Select
            options={languageOptions}
            placeholder={language === "en" ? "Eng (US)" : "Vi (VN)"}
            closeMenuOnSelect={true}
            className={style.FlavourSelect}
            onChange={handleLanguageChange}
          />
          <Popover>
            <PopoverTrigger>
              <Button className={style.NotificationButton}>
                <FaRegBell />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody>No new notifications</PopoverBody>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button className={style.ProfileButton}>
                <Flex className={style.ProfileContainer}>
                  <Flex>
                    <Image
                      src="https://bit.ly/dan-abramov"
                      className={style.ProfileImage}
                    />
                    <Flex className={style.ProfileInfo}>
                      <Text className={style.ProfileName}>Travis</Text>
                      <Text className={style.ProfileRole}>Admin</Text>
                    </Flex>
                  </Flex>
                  <RiArrowDropDownLine className={style.DropdownIcon} />
                </Flex>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={style.PopupContainer}>
              <PopoverArrow />
              <PopoverBody>
                <Flex className={style.PopupNav}>
                  <ChakraLink
                    as={ReactRouterLink}
                    to="/profile"
                    style={{ textDecoration: "none" }}
                  >
                    <Flex className={style.PopupSubNav}>
                      <Text className={style.Text}>Profile</Text>
                    </Flex>
                  </ChakraLink>
                  <Flex className={style.PopupSubNav}>
                    <Text className={style.Text}>History</Text>
                  </Flex>
                  <Flex className={style.PopupSubNav}>
                    <Text className={style.Text}>FeedBack</Text>
                  </Flex>
                  <Flex className={style.PopupSubNav}>
                    <Text className={style.Text}>Logout</Text>
                  </Flex>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
