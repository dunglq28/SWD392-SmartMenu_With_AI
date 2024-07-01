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
import style from "./Category.module.scss";
import Searchbar from "../../components/Searchbar";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { CategoryData } from "../../payloads/responses/CategoryData.model";
import { getOptions } from "../../utils/getRowPerPage";
import { getCategory } from "../../services/CategoryService";
import { toast } from "react-toastify";
import moment from "moment";
import NavigationDot from "../../components/NavigationDot/NavigationDot";

function Category() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<CategoryData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const brandId = localStorage.getItem("BrandId");

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          if (searchValue) {
            result = await getCategory(
              Number(brandId),
              currentPage,
              rowsPerPage,
              searchValue
            );
          } else {
            result = await getCategory(
              Number(brandId),
              currentPage,
              rowsPerPage,
              ""
            );
          }
          setData(result.list);
          setTotalPages(result.totalPage);
          setRowsPerPageOption(getOptions(result.totalRecord));
          setIsLoading(false);
          setIsInitialLoad(false);
        };

        if (isInitialLoad) {
          setTimeout(loadData, 500);
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

  function handleDelete(id: number) {
    console.log(id);
  }

  function handleEdit(id: number) {
    console.log(id);
  }

  async function handleSearch(value: string) {
    fetchData(value);
  }

  return (
    <Flex className={style.container}>
      <Flex w="40%" ml="20px">
        <Searchbar onSearch={handleSearch} />
      </Flex>
      <Flex className={style.Category}>
        <TableContainer className={style.CategoryTbl}>
          <Table>
            <TableCaption>Bảng quản lý loại sản phẩm</TableCaption>
            <Thead>
              <Tr>
                <Th className={style.HeaderTbl}>Id</Th>
                <Th className={style.HeaderTbl}>Name</Th>
                <Th className={style.HeaderTbl}>Created on</Th>
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
              ) : data.length === 0 ? (
                <Tr>
                  <Td colSpan={10}>Không có loại sản phẩm để hiển thị</Td>
                </Tr>
              ) : (
                data.map((cate, index) => (
                  <Tr key={cate.categoryId} className={style.CategoryItem}>
                    <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
                    <Td>{cate.categoryName}</Td>
                    <Td>{moment(cate.createDate).format("DD/MM/YYYY")}</Td>
                    <Td>
                      {/* <ActionMenu
                        id={Category.CategoryId}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      /> */}
                    </Td>
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
    </Flex>
  );
}

export default Category;
