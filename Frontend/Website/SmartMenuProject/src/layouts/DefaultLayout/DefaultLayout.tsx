import React, { ReactNode } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { Flex } from "@chakra-ui/react";
import style from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    // wrapper
    <Flex className={style.Wrapper}>
      {/* container */}
      <Flex w="100%">
        <Sidebar />
        <Flex className={style.Container}>
          <Header />
          <Flex className={style.Children}>{children}</Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default DefaultLayout;
