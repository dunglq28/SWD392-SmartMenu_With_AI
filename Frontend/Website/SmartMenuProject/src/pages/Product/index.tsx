import React from "react";
import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
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
import ModalForm from "../../components/Modals/ModalForm/ModalForm";
import ModalFormBranch from "../../components/Modals/ModalFormBranch/ModalFormBranch";
import ModalFormProduct from "../../components/Modals/ModalFormProduct";

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

  const {
    isOpen: isOpenProduct,
    onOpen: onOpenProduct,
    onClose: onCloseProduct,
  } = useDisclosure();

  return (
    <Flex className={style.Product}>
      <Flex>
        <Button onClick={onOpenProduct} className={style.AddProductBtn}>
          Add product
        </Button>
        <ModalForm
          formBody={<ModalFormProduct onClose={onCloseProduct} />}
          onClose={onCloseProduct}
          isOpen={isOpenProduct}
          title={"Add New Product"}
        />
      </Flex>
      <TableContainer className={style.ProductTbl}>
        <Table>
          <TableCaption>Bảng quản lý Product</TableCaption>
          <Thead>
            <Tr>
              <Th className={style.HeaderTbl}>Id</Th>
              <Th className={style.HeaderTbl}>Name</Th>
              <Th className={style.HeaderTbl}>Description</Th>
              <Th className={style.HeaderTbl}>Created on</Th>
              <Th className={style.HeaderTbl}>Image</Th>
              <Th className={style.HeaderTbl}>Category</Th>
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
              data.map((product, index) => (
                <Tr key={product.productCode} className={style.ProductItem}>
                  <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
                  <Td>{product.productName}</Td>
                  <Td className={style.WrapText}>{product.description}</Td>
                  <Td>{moment(product.createDate).format("DD/MM/YYYY")}</Td>
                  <Td>
                    <img
                      // src={product.imageUrl}
                      src="https://smart-menu-with-ai.s3.ap-southeast-1.amazonaws.com/brands/highlands.png"
                      alt={product.productName}
                      className={style.ProductImage}
                    />
                  </Td>
                  {/* <Td>{product.categoryId}</Td> */}
                  <Td>Cà Phê</Td>
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
