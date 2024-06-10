import React from "react";
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

function truncateText(text: string | undefined, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength) + "...";
}

function Product() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [status, setStatus] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let result;

      const loadData = async () => {
        result = await getProduct(currentPage, rowsPerPage);
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
  }, [currentPage, rowsPerPage, isInitialLoad]);

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
              <Th className={style.HeaderTbl}>Category ID</Th>
              <Th className={style.HeaderTbl}>Brand ID</Th>
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
              data.map((product) => (
                <Tr key={product.productCode} className={style.ProductItem}>
                  <Td>{product.productId}</Td>
                  <Td>{moment(product.createDate).format("DD/MM/YYYY")}</Td>
                  <Td title={product.productName}>
                    {truncateText(product.productName, 10)}
                  </Td>
                  <Td>{truncateText(product.spotlightVideoImageUrl, 10)}</Td>
                  <Td>{truncateText(product.spotlightVideoImageName, 10)}</Td>
                  <Td>{truncateText(product.imageUrl, 10)}</Td>
                  <Td>{truncateText(product.imageName, 10)}</Td>
                  <Td title={product.description}>
                    {truncateText(product.description, 10)}
                  </Td>
                  <Td>{product.categoryId}</Td>
                  <Td>{product.brandId}</Td>
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
  );
}

export default Product;
