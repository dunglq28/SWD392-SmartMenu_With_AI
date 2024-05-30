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
  useDisclosure,
} from "@chakra-ui/react";
import { RiSettings3Line } from "react-icons/ri";
import React, { useRef } from "react";
import style from "./User.module.scss";

function User() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <Flex className={style.User}>
      <TableContainer className={style.UserTbl}>
        <Table variant="striped">
          <TableCaption>Bảng quản lý user</TableCaption>
          <Thead>
            <Tr>
              <Th>User code</Th>
              <Th>User name</Th>
              <Th>Role id</Th>
              <Th>Created date</Th>
              <Th>Is active</Th>
              <Th>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              <Td>
                <Flex className={style.SettingUser}>
                  <Popover initialFocusRef={initRef} closeOnBlur>
                    <PopoverTrigger>
                      {/* Thẻ Flex để PopoverTrigger ăn nếu không thì nó hiện sai chỗ */}
                      <Flex>
                        <RiSettings3Line className={style.SettingsIcon} />
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent width="auto">
                      <PopoverBody>
                        <Flex
                          // Phải dùng css inline vì className={style.PopupButton} không ăn
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
                          <Text>Edit User</Text>
                        </Flex>
                        <Divider />
                        <Flex
                          // Phải dùng css inline vì className={style.PopupButton} không ăn
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
                          <Text>Delete User</Text>
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>millimetres (mm)</Td>
              <Td>millimetres (mm)</Td>
              <Td>
                <Flex className={style.SettingUser}>
                  <RiSettings3Line className={style.SettingsIcon} />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>metres (m)</Td>
              <Td>metres (m)</Td>
              <Td>
                <Flex className={style.SettingUser}>
                  <RiSettings3Line className={style.SettingsIcon} />
                </Flex>
              </Td>
            </Tr>
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default User;
