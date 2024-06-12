import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./Brand.module.scss";
import { Image } from "@chakra-ui/react";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import { getBrandOptions } from "../../utils/getRowPerPage";
import { getBrands } from "../../services/BrandService";
import { BrandData } from "../../payloads/responses/BrandData.model";
import moment from "moment";
import Loading from "../../components/Loading";
import ActionMenu from "../../components/Brand/ActionMenu";
import { brandUpdate } from "../../payloads/requests/updateBrand.model";

function Brand() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<BrandData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([6]);
  const [totalPages, setTotalPages] = useState<number>(10);
  let flag = false;

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.success(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let result;

      const loadData = async () => {
        result = await getBrands(currentPage, rowsPerPage);
        setData(result.list);
        setTotalPages(result.totalPage);
        setRowsPerPageOption(getBrandOptions(result.totalRecord));
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

  async function handleEdit(id: number, brand: brandUpdate) {
    console.log(id);
    console.log(brand);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      {/* <div className={style.title}>All Brand</div> */}
      <div className={style.cardContainer}>
        {data.map((brand) => (
          <div className={style.cardWrapper}>
            <div className={style.card}>
              <Image
                boxSize="140px"
                objectFit="cover"
                borderRadius="full"
                src={brand.imageUrl}
                alt={brand.imageName}
              />
              <div className={style.wrapperText}>
                <div className={style.header}>{brand.brandName}</div>
                <div className={style.createDate}>
                  Create on {moment(brand.createDate).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className={style.btnContainer}>
                <ActionMenu
                  id={brand.brandId}
                  brandName={brand.brandName}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={style.paginationContainer}>
        <NavigationDot
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={rowsPerPageOption}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
}

export default Brand;
