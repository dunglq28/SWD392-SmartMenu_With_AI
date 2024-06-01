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
import style from "./User.module.scss";

import { RiSettings3Line } from "react-icons/ri";
import { userList } from "../../mock/data";
import React, { MutableRefObject } from "react";

function User() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);

  return (
    <Flex className={style.User}>
      <TableContainer className={style.UserTbl}>
        <Table>
          <TableCaption>Bảng quản lý user</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>User code</Th>
              <Th className={style.HeaderTbl}>User name</Th>
              <Th className={style.HeaderTbl}>Role id</Th>
              <Th className={style.HeaderTbl}>Created date</Th>
              <Th className={style.HeaderTbl}>Is active</Th>
              <Th className={style.HeaderTbl}>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList.map((user) => (
              <Tr key={user.userCode} className={style.UserItem}>
                <Td>{user.userCode}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.roleId}</Td>
                <Td>{user.createdDate}</Td>
                <Td>{user.isActive ? "Yes" : "No"}</Td>
                <Td>
                  <Flex className={style.SettingUser}>
                    <Popover>
                      <PopoverTrigger>
                        {/* Thẻ Flex để PopoverTrigger ăn nếu không thì nó hiện sai chỗ */}
                        <Flex>
                          <RiSettings3Line className={style.SettingsIcon} />
                        </Flex>
                      </PopoverTrigger>
                      <PopoverContent width="auto">
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
          {/* <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot> */}
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

export default User;
