import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
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
  useDisclosure,
} from "@chakra-ui/react";
import style from "./Product.module.scss";

import { RiSettings3Line } from "react-icons/ri";
import { productList } from "../../mock/data";
import React from "react";

function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);

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
                        <Button className={style.SettingsIconBtn}>
                          <Flex>
                            <RiSettings3Line className={style.SettingsIcon} />
                          </Flex>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className={style.PopoverContent}>
                        <PopoverArrow />
                        <PopoverBody>
                          <Flex className={style.PopupButton}>
                            <Text>Edit User</Text>
                          </Flex>
                          <Divider />
                          <Flex className={style.PopupButton} onClick={onOpen}>
                            <Text>Delete User</Text>
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default Product;
