import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  Flex,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import HeaderImg from "../../../../assets/images/menu/CreateMenu/HeaderBackground.svg";
import ProductCard from "./ProductCard";
import matcha from "../../../../assets/images/menu/CreateMenu/FREEZE-TRA-XANH.png";
import { ProductData } from "../../../../payloads/responses/ProductData.model";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToMenu: (selectedProducts: ProductData[], Index: number) => void;
  products: ProductData[];
  currentListProducts: ProductData[];
  IndexList: number;
  MaxProduct: number;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  onAddToMenu,
  products, // Sử dụng danh sách sản phẩm từ prop
  currentListProducts,
  IndexList,
  MaxProduct,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    setSelectedProducts(currentListProducts);
  }, [currentListProducts]);
  // Function để thêm sản phẩm đã chọn vào danh sách
  const handleAddToSelectedProducts = (product: ProductData) => {
    // Kiểm tra nếu sản phẩm chưa được chọn và chưa đạt MaxProduct
    if (
      !selectedProducts.find((p) => p.productId === product.productId) &&
      selectedProducts.length < MaxProduct
    ) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Function để loại bỏ sản phẩm đã chọn khỏi danh sách
  const handleRemoveFromSelectedProducts = (productId: number) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.productId !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  // Function để thêm danh sách sản phẩm đã chọn vào menu
  const addToMenu = () => {
    onAddToMenu(selectedProducts, IndexList);
    setSelectedProducts([]); // Xóa danh sách sản phẩm đã chọn sau khi thêm vào menu
    onClose(); // Đóng Drawer sau khi thêm vào menu
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent backgroundColor="#E3F2F1">
        <DrawerCloseButton />
        <DrawerBody>
          <Flex w="100%" height="100%" padding="20px 10px">
            {/* Left panel for categories */}
            <Flex
              height="100%"
              width="15%"
              flexDirection="column"
              rowGap="20px"
              marginTop="20px"
              borderRight="1px solid #ccc"
            >
              <Flex
                height="10%"
                width="80%"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  position="absolute"
                  fontSize="1.5vw"
                  fontWeight="bold"
                  color="#7DD7F3"
                >
                  Loại đồ uống
                </Text>
                <Image src={HeaderImg} />
              </Flex>
              <Flex
                height="90%"
                width="80%"
                flexDirection="column"
                rowGap="5px"
              >
                {/* Replace with your actual category buttons */}
                <Button height="60px" w="100%" border="1px solid #ccc">
                  Freeze
                </Button>
              </Flex>
            </Flex>
            {/* Center panel for product list */}
            <Flex
              width="65%"
              alignItems="center"
              flexDirection="column"
              borderRight="1px solid #ccc"
            >
              <Flex
                height="10%"
                width="80%"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
              >
                <Text
                  position="absolute"
                  fontSize="2vw"
                  fontWeight="bold"
                  color="#7DD7F3"
                >
                  Sản phẩm
                </Text>
                <Image src={HeaderImg} />
              </Flex>
              <Flex
                width="95%"
                marginTop="10px"
                justifyContent="space-around"
                flexWrap="wrap"
                overflowY="auto"
                paddingTop="15px"
                paddingBottom="15px"
                rowGap="10px"
              >
                {/* Example ProductCards */}
                {products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={{
                      id: product.productId,
                      name: product.productName,
                      price: product.price,
                      description: product.description,
                    }}
                    isSelected={selectedProducts.some(
                      (p) => p.productId === product.productId
                    )}
                    onClick={() => handleAddToSelectedProducts(product)}
                  />
                ))}
                {/* End of Example ProductCards */}
              </Flex>
            </Flex>
            {/* Right panel for selected products */}
            <Flex
              height="100%"
              width="20%"
              alignItems="center"
              flexDirection="column"
            >
              <Flex
                height="10%"
                width="80%"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
              >
                <Text
                  position="absolute"
                  fontSize="1.7vw"
                  fontWeight="bold"
                  color="#7DD7F3"
                >
                  ĐÃ CHỌN
                </Text>
                <Image src={HeaderImg} />
              </Flex>
              <Flex height="80%" width="100%" justifyContent="center">
                <Flex
                  width="100%"
                  height="99%"
                  flexDirection="column"
                  rowGap="10px"
                  overflow="auto"
                  padding="20px"
                >
                  {selectedProducts.map((product) => (
                    <Flex
                      key={product.productId}
                      height="100px"
                      width="100%"
                      justifyContent="center"
                      alignItems="center"
                      padding="5px"
                      bg="#fff"
                      borderRadius="10px"
                      cursor="pointer"
                      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                      transition="0.3s"
                      userSelect="none"
                      _hover={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                      }}
                      _active={{
                        transition: "0.1s",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                      }}
                      onClick={() =>
                        handleRemoveFromSelectedProducts(product.productId)
                      }
                    >
                      <Image src={matcha} height="80%" />
                      <Flex flexDirection="column" w="80%">
                        <Flex justifyContent="space-between">
                          <Text
                            fontSize="0.7vw"
                            fontWeight="bold"
                            color="#5A3D41"
                          >
                            {product.productName}
                          </Text>
                          <Text
                            fontSize="0.7vw"
                            fontWeight="bold"
                            color="#5A3D41"
                          >
                            Giá {product.price}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="0.5vw"
                          color="#5A3D41"
                          textAlign="justify"
                          marginTop="3px"
                        >
                          {product.description}
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Button onClick={addToMenu}>Thêm vào menu</Button>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
