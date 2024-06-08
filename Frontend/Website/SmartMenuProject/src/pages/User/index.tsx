import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  ModalBody,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  Stack,
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
import React, { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../services/UserService";
import NavigationDot from "../../components/NavigationDot/NavigationDot";

function User() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [status, setStatus] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      let result;
      result = await getUsers();
      console.log(result);
    } catch (err) {}
  }, [currentPage, rowsPerPage]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleRowsPerPageChange = useCallback(
    (newRowsPerPage: number) => {
      setCurrentPage(1);
      setRowsPerPage(newRowsPerPage);
    },
    [setCurrentPage, setRowsPerPage]
  );

  return (
    <Flex className={style.User} flexDirection="column">
      <Flex className={style.ButtonContainer}>
      </Flex>
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
      <NavigationDot
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={rowsPerPageOption}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Flex>
  );
}

export default User;
