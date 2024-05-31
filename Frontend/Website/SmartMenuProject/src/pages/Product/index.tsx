import {
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import style from "./Product.module.scss";

import { RiSettings3Line } from "react-icons/ri";
import { productList } from "../../mock/data";

function Product() {
  // const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Flex className={style.Product}>
      <TableContainer className={style.ProductTbl}>
        <Table>
          <TableCaption>Bảng quản lý Product</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>Product code</Th>
              <Th className={style.HeaderTbl}>Created date</Th>
              <Th className={style.HeaderTbl}>Product name</Th>
              <Th className={style.HeaderTbl}>Spotlight url</Th>
              <Th className={style.HeaderTbl}>Spotlight name</Th>
              <Th className={style.HeaderTbl}>Image url</Th>
              <Th className={style.HeaderTbl}>Image name</Th>
              <Th className={style.HeaderTbl}>Description</Th>
              <Th className={style.HeaderTbl}>Category</Th>
              <Th className={style.HeaderTbl}>Brand</Th>
              <Th className={style.HeaderTbl}>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productList.map((product) => (
              <Tr key={product.productCode} className={style.ProductItem}>
                <Td>{product.productCode}</Td>
                <Td>{product.createdDate}</Td>
                <Td>{product.productName}</Td>
                <Td>{product.spotlightUrl}</Td>
                <Td>{product.spotlightName}</Td>
                <Td>{product.imageUrl}</Td>
                <Td>{product.imageName}</Td>
                <Td>{product.description}</Td>
                <Td>{product.categoryId}</Td>
                <Td>{product.brandId}</Td>
                <Td>
                  <Flex className={style.SettingProduct}>
                    <Popover>
                      <PopoverTrigger>
                        {/* Thẻ Flex để PopoverTrigger ăn nếu kh thì nó hiện sai chỗ */}
                        <Flex>
                          <RiSettings3Line className={style.SettingsIcon} />
                        </Flex>
                      </PopoverTrigger>
                      <PopoverContent width="auto">
                        <PopoverBody>
                          <Flex
                            //Phải dùng css inline vì className = {style.PopupButton} không ăn
                            className={style.PopupButton}
                            width="100px"
                            height="40px"
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                            userSelect="none"
                            transition="0.3s"
                            _hover={{
                              backgroundColor: "brand.100",
                            }}
                          >
                            <Text>Edit Product</Text>
                          </Flex>
                          <Divider />
                          <Flex
                            //Phải dùng css inline vì className = {style.PopupButton} không ăn
                            className={style.PopupButton}
                            width="100px"
                            height="40px"
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                            userSelect="none"
                            transition="0.3s"
                            _hover={{
                              backgroundColor: "brand.100",
                            }}
                          >
                            <Text>Delete Product</Text>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default Product;
