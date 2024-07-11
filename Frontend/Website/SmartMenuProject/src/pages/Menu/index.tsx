import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import style from "./Menu.module.scss";
import MenuCard from "../../components/Menu/MenuCard";
import { MenuData } from "../../payloads/responses/MenuData.model";
import { getAllMenu } from "../../services/MenuService";
import { getOptions } from "../../utils/functionHelper";
import { toast } from "react-toastify";
import NavigationDot from "../../components/NavigationDot/NavigationDot";

function Menu() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<MenuData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const brandId = localStorage.getItem("BrandId");

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          result = await getAllMenu(Number(brandId), currentPage, rowsPerPage);
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

  return (
    <>
      <Flex className={style.Container}>
        <Flex>
          <ChakraLink
            as={ReactRouterLink}
            to="/menu/create-menu"
            className={style.MenuItem}
          >
            <Button className={style.AddMenuBtn}>Tạo menu</Button>
          </ChakraLink>
        </Flex>
        <Flex className={style.CardContainer}>
          {data.map((menu, index) => (
            <MenuCard key={index} menu={menu} />
          ))}
        </Flex>
        <div style={{ width: "100%" }}>
          <NavigationDot
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            rowsPerPageOptions={rowsPerPageOption}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </Flex>
    </>
  );
}

export default Menu;
