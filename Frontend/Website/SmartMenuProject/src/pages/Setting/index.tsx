import React, { useEffect, useState } from "react";
import { Flex, Switch, Text } from "@chakra-ui/react";
import i18n from "../../i18n/i18n";

function Setting() {
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

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "vi" : "en";
    changeLanguage(newLanguage);
  };

  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    changeLanguage(initialLanguage);
  }, []);

  return (
    <Flex w="100%" justifyContent="center">
      <Flex w="80%" justifyContent="center">
        <Flex columnGap="20px" userSelect="none">
          <Text>EN</Text>
          <Switch
            colorScheme="teal"
            size="lg"
            isChecked={language === "vi"}
            onChange={handleLanguageToggle}
          />
          <Text>VI</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Setting;
