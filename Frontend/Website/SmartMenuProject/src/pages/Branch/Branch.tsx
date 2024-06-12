import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BrandData } from "../../payloads/responses/BrandData.model";
import style from "./Branch.module.scss";
import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Loading from "../../components/Loading";
import NavigationDot from "../../components/NavigationDot/NavigationDot";

function Branch() {
  const { brandName } = useParams<{ brandName: string }>();
  const [brandData, setBrandData] = useState<BrandData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);

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
    <Flex className={style.Brand} flexDirection="column">
      <Flex className={style.ButtonContainer}></Flex>
      <TableContainer className={style.BrandTbl}>
        <Table>
          <TableCaption>Bảng quản lý chi nhánh</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>Id</Th>
              <Th className={style.HeaderTbl}>Brand name</Th>
              <Th className={style.HeaderTbl}>City</Th>
              <Th className={style.HeaderTbl}>Address</Th>
              <Th className={style.HeaderTbl}>Create on</Th>
              <Th className={style.HeaderTbl}>Is active</Th>
              <Th className={style.HeaderTbl}>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && isInitialLoad ? (
              <Tr>
                <Td colSpan={10} className={style.LoadingCell}>
                  <Loading />
                </Td>
              </Tr>
            ) : (
              // brandData.map((brand, index) => (
                <Tr className={style.BrandItem}>
                  {/* <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td> */}
                  <Td>1</Td>
                  <Td>Highlands</Td>
                  <Td>Hồ Chí Minh</Td>
                  <Td>135 Nguyễn Tư Giản, Phường 12, Quận Gò Vấp</Td>
                  <Td>2/8/2024</Td>
                  <Td>Yes</Td>
                  <Td>Yes</Td>
                </Tr>
              // ))
            )}
          </Tbody>
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

export default Branch;
