import React, { useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import ModalFormCreateMenu from "../../../components/Modals/ModalFormCreateMenu";
import DrawerComponent from "../../../components/Menu/CreateMenu/DrawerComponent";
import style from "./CreateMenu.module.scss";
import fakeMenu from "../../../assets/images/menu/menuImg.png";
import { ProductData } from "../../../payloads/responses/ProductData.model";
import fakeProductList from "./fakeProductList";

function CreateMenu() {
  const [isOpenCreateMenu, setIsOpenCreateMenu] = React.useState(false);
  const [isOpenListProduct, setIsOpenListProduct] = React.useState(false);
  const [selectedProducts1, setSelectedProducts1] = React.useState<
    ProductData[]
  >([]);
  const [selectedProducts2, setSelectedProducts2] = React.useState<
    ProductData[]
  >([]);
  const [selectedProducts3, setSelectedProducts3] = React.useState<
    ProductData[]
  >([]);
  const [selectedProducts4, setSelectedProducts4] = React.useState<
    ProductData[]
  >([]);
  const [currentListProduct, setCurrentListProduct] = React.useState<
    ProductData[]
  >([]);
  const [currentListIndex, setCurrentIndex] = useState(0);
  const [maxProduct, setMaxProduct] = useState(0);

  const onOpenCreateMenu = () => setIsOpenCreateMenu(true);
  const onCloseCreateMenu = () => setIsOpenCreateMenu(false);
  const onOpenListProduct = (Index: number) => {
    setCurrentIndex(Index);
    switch (Index) {
      case 1:
        setCurrentListProduct(selectedProducts1);
        setMaxProduct(4);
        break;
      case 2:
        setCurrentListProduct(selectedProducts2);
        setMaxProduct(4);
        break;
      case 3:
        setCurrentListProduct(selectedProducts3);
        setMaxProduct(4);
        break;
      case 4:
        setCurrentListProduct(selectedProducts4);
        setMaxProduct(2);
        break;
    }
    setIsOpenListProduct(true);
  };
  const onCloseListProduct = () => setIsOpenListProduct(false);

  // Function để cập nhật selectedProducts1 khi thay đổi

  const handleAddToMenu = (products: ProductData[], Index: number) => {
    switch (Index) {
      case 1:
        setSelectedProducts1(products);
        break;
      case 2:
        setSelectedProducts2(products);
        break;
      case 3:
        setSelectedProducts3(products);
        break;
      case 4:
        setSelectedProducts4(products);
        break;
    }
    onCloseListProduct();
  };

  return (
    <Flex className={style.Container}>
      <Text as="b" fontSize="30px">
        Vui lòng chọn mẫu thực đơn
      </Text>
      <Flex className={style.CardContainer}>
        <Flex className={style.Card} bg="#E3F2F1" onClick={onOpenCreateMenu}>
          <Image className={style.MenuImg} src={fakeMenu} />
        </Flex>
      </Flex>
      <ModalFormCreateMenu
        isOpen={isOpenCreateMenu}
        onClose={onCloseCreateMenu}
        onOpenListProduct={onOpenListProduct}
        selectedProducts1={selectedProducts1}
        selectedProducts2={selectedProducts2}
        selectedProducts3={selectedProducts3}
        selectedProducts4={selectedProducts4}
      />
      <DrawerComponent
        isOpen={isOpenListProduct}
        onClose={onCloseListProduct}
        onAddToMenu={handleAddToMenu}
        IndexList={currentListIndex}
        products={fakeProductList}
        currentListProducts={currentListProduct}
        MaxProduct={maxProduct}
      />
    </Flex>
  );
}

export default CreateMenu;
