import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BranchData } from "../../payloads/responses/BranchData.model";
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
import { getOptions } from "../../utils/getRowPerPage";
import { getBranches } from "../../services/BranchService";
import moment from "moment";

function Branch() {
  const location = useLocation();
  const { brandName, id } = location.state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [branchData, setBranchData] = useState<BranchData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          if (searchValue) {
            result = await getBranches(
              id,
              currentPage,
              rowsPerPage,
              searchValue
            );
          } else {
            result = await getBranches(id, currentPage, rowsPerPage, "");
          }
          setBranchData(result.list);
          setTotalPages(result.totalPage);
          setTotalRecords(result.totalRecord);
          setRowsPerPageOption(getOptions(result.totalRecord));
          setIsLoading(false);
        };

        if (isInitialLoad) {
          setTimeout(async () => {
            setIsInitialLoad(false);
          }, 500);
        } else {
          await loadData();
        }
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu");
        setIsLoading(false);
      }
    },
    [currentPage, rowsPerPage, isInitialLoad]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, currentPage, isInitialLoad]);

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

  async function handleDelete(id: number) {}

  async function handleEdit(id: number) {}

  async function handleSearch(value: string) {
    fetchData(value);
  }

  return (
    <Flex className={style.Brand} flexDirection="column">
      <Flex className={style.ButtonContainer}></Flex>
      <TableContainer className={style.BrandTbl}>
        <Table>
          <TableCaption>Bảng quản lý chi nhánh</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>Id</Th>
              {/* <Th className={style.HeaderTbl}>Brand name</Th> */}
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
              branchData.map((brand, index) => (
                <Tr className={style.BrandItem}>
                  <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
                  {/* <Td>{brandName}</Td> */}
                  <Td>{brand.city}</Td>
                  <Td>{brand.address}</Td>
                  <Td>{moment(brand.createDate).format("DD/MM/YYYY")}</Td>
                  <Td>{brand.isActive ? "Yes" : "No"}</Td>
                  <Td>Yes</Td>
                </Tr>
              ))
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
