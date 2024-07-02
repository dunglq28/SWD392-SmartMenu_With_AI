import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

import style from "./Product.module.scss";
import { useCallback, useEffect, useState } from "react";
import { ProductData } from "../../payloads/responses/ProductData.model";
import { createProduct, deleteProduct, getProducts } from "../../services/ProductService";
import { getOptions } from "../../utils/getRowPerPage";
import { toast } from "react-toastify";
import moment from "moment";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import Loading from "../../components/Loading";
import ModalForm from "../../components/Modals/ModalForm/ModalForm";
import ModalFormProduct from "../../components/Modals/ModalFormProduct/ModalFormProduct";
import Searchbar from "../../components/Searchbar";
import { formatCurrency } from "../../utils/formatCurrency";
import { ProductForm } from "../../models/ProductForm.model";
import ActionMenu from "../../components/Product/ActionMenu";
import { productUpdate } from "../../payloads/requests/updateProduct.model";

function Product() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const brandId = localStorage.getItem("BrandId");
  const {
    isOpen: isOpenProduct,
    onOpen: onOpenProduct,
    onClose: onCloseProduct,
  } = useDisclosure();

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          if (searchValue) {
            result = await getProducts(
              Number(brandId),
              currentPage,
              rowsPerPage,
              searchValue
            );
          } else {
            result = await getProducts(
              Number(brandId),
              currentPage,
              rowsPerPage,
              ""
            );
          }
          setData(result.list);
          setTotalPages(result.totalPage);
          setTotalRecords(result.totalRecord);
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

  async function handleCreate(productForm: FormData) {
    try {
      setIsLoading(true);
      const productResult = await createProduct(productForm);
      console.log(productResult);
      
      if (productResult.statusCode === 200) {
        fetchData();
        toast.success("Thêm sản phẩm thành công");
        onCloseProduct();
      } else {
        toast.error(productResult.message);
        // onCloseProduct();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const result = await deleteProduct(id);
      if (result.statusCode === 200) {
        if ((totalRecords - 1) % rowsPerPage === 0 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        } else {
          fetchData();
        }
        toast.success("Xoá sản phẩm thành công");
      }
    } catch (e) {
      toast.error("Xoá sản phẩm thất bại");
    }
  }

  function handleEdit(product: productUpdate) {
  }

  async function handleSearch(value: string) {
    fetchData(value);
  }

  return (
    <Flex className={style.container}>
      <Flex className={style.searchWrapper}>
        <Searchbar onSearch={handleSearch} />
        <Button onClick={onOpenProduct} className={style.AddProductBtn}>
          <Text as="span" fontSize="25px" me={3}>
            <IoAddCircleOutline />
          </Text>
          Create product
        </Button>
        <ModalForm
          formBody={
            <ModalFormProduct
              onClose={onCloseProduct}
              handleCreate={handleCreate}
              isEdit={false}
            />
          }
          onClose={onCloseProduct}
          isOpen={isOpenProduct}
          title={"Add New Product"}
        />
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
                    <Td>{product.categoryName}</Td>
                    <Td>{formatCurrency(product.price.toString())}</Td>
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
