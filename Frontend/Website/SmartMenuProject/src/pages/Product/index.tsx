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
import style from "./Product.module.scss";
import { useCallback, useEffect, useState } from "react";
import { ProductData } from "../../payloads/responses/ProductData.model";
import { getProduct } from "../../services/ProductService";
import { getOptions } from "../../utils/getRowPerPage";
import { toast } from "react-toastify";
import moment from "moment";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import ActionMenu from "../../components/User/ActionMenu/ActionMenu";
import Loading from "../../components/Loading";
import Searchbar from "../../components/Searchbar";
import { formatCurrency } from "../../utils/formatCurrency";

function Product() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<ProductData[]>([]);
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
            result = await getProduct(
              Number(brandId),
              currentPage,
              rowsPerPage,
              searchValue
            );
          } else {
            result = await getProduct(
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
      <Flex className={style.Product}>
        <TableContainer className={style.ProductTbl}>
          <Table>
            <TableCaption>Bảng quản lý sản phẩm</TableCaption>
            <Thead>
              <Tr>
                <Th className={style.HeaderTbl}>Id</Th>
                <Th className={style.HeaderTbl}>Name</Th>
                <Th className={style.HeaderTbl}>Image</Th>
                <Th className={style.HeaderTbl}>Category</Th>
                <Th className={style.HeaderTbl}>Price</Th>
                <Th className={style.HeaderTbl}>Description</Th>
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
                  <Td colSpan={10}>Không có sản phẩm để hiển thị</Td>
                </Tr>
              ) : (
                data.map((product, index) => (
                  <Tr key={product.productCode} className={style.ProductItem}>
                    <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
                    <Td>{product.productName}</Td>
                    <Td>
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className={style.ProductImage}
                      />
                    </Td>
                    <Td>Cà Phê</Td>
                    {/* <Td>{product.categoryId}</Td> */}
                    <Td>{formatCurrency("27000")}</Td>
                    <Td className={style.WrapText}>{product.description}</Td>
                    <Td>{moment(product.createDate).format("DD/MM/YYYY")}</Td>
                    <Td>
                      <ActionMenu
                        id={product.productId}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
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

export default Product;
