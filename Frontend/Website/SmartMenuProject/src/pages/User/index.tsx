import {
  Flex,
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
import style from "./User.module.scss";

// import { userList } from "../../mock/data";
import React, { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../services/UserService";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import { getOptions } from "../../utils/getRowPerPage";
import { UserData } from "../../payloads/responses/UserData.model";
import moment from "moment";
import { UserRole } from "../../constants/Enum";
import { toast } from "react-toastify";
import ActionMenu from "../../components/User/ActionMenu/ActionMenu";

function User() {
  const [data, setData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [status, setStatus] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      let result;
      result = await getUsers(currentPage, rowsPerPage);
      setData(result.list);
      setTotalPages(result.totalPage);
      setRowsPerPageOption(getOptions(result.totalRecord));
    } catch (err) {
      toast.error("Lỗi khi lấy dữ liệu");
    }
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const getRoleName = (roleId: number): string => {
    if (roleId === UserRole.BrandManager) {
      return "Brand Manager";
    } else if (roleId === UserRole.BranchManager) {
      return "Branch Manager";
    }
    return UserRole[roleId] || "Unknown Role";
  };

  function handleDelete(id: number) {
    console.log(id);
  }

  function handleEdit(id: number) {
    console.log(id);
  }

  return (
    <Flex className={style.User} flexDirection="column">
      <Flex className={style.ButtonContainer}></Flex>
      <TableContainer className={style.UserTbl}>
        <Table>
          <TableCaption>Bảng quản lý user</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>Id</Th>
              <Th className={style.HeaderTbl}>Full name</Th>
              <Th className={style.HeaderTbl}>User name</Th>
              <Th className={style.HeaderTbl}>Date of birth</Th>
              <Th className={style.HeaderTbl}>Gender</Th>
              <Th className={style.HeaderTbl}>Phone number</Th>
              <Th className={style.HeaderTbl}>Role name</Th>
              <Th className={style.HeaderTbl}>Created on</Th>
              <Th className={style.HeaderTbl}>Is active</Th>
              <Th className={style.HeaderTbl}>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user) => (
              <Tr key={user.userCode} className={style.UserItem}>
                <Td>{user.userId}</Td>
                <Td>{user.fullname}</Td>
                <Td>{user.userName}</Td>
                <Td>{moment(user.dob).format("DD/MM/YYYY")}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.phone}</Td>
                <Td>{getRoleName(user.roleId)}</Td>
                <Td>{moment(user.createDate).format("DD/MM/YYYY")}</Td>
                <Td>{user.isActive ? "Yes" : "No"}</Td>
                <Td>
                  <ActionMenu id={user.userId} onDelete={handleDelete} onEdit={handleEdit}/>
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
