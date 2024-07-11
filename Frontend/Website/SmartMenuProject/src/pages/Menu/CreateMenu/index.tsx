import React, { useEffect, useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import ModalFormCreateMenu from "../../../components/Modals/ModalFormCreateMenu";
import DrawerComponent from "../../../components/Menu/CreateMenu/DrawerComponent";
import style from "./CreateMenu.module.scss";
import fakeMenu from "../../../assets/images/menu/menuImg.png";
import { ProductData } from "../../../payloads/responses/ProductData.model";
import { CategoryData } from "../../../payloads/responses/CategoryData.model";
import { getCategoriesByBrandId } from "../../../services/CategoryService";
import { toast } from "react-toastify";
import { getProductsByCategory } from "../../../services/ProductService";
import { CustomerSegmentData } from "../../../payloads/responses/CustomerSegment.model";
import { MenuList } from "../../../models/Menu.model";
import {
  createListPosition,
  createMenu,
  createMenuList,
} from "../../../services/MenuService";

function CreateMenu() {
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState(false);
  const [isOpenListProduct, setIsOpenListProduct] = useState(false);
  const initializeMenuListState = (listIndex: number, maxProduct: number) => ({
    listName: "",
    productData: [],
    listIndex,
    maxProduct,
  });
  const [selectedProducts1, setSelectedProducts1] = useState<MenuList>(
    initializeMenuListState(1, 4)
  );
  const [selectedProducts2, setSelectedProducts2] = useState<MenuList>(
    initializeMenuListState(2, 4)
  );
  const [selectedProducts3, setSelectedProducts3] = useState<MenuList>(
    initializeMenuListState(3, 4)
  );
  const [selectedProducts4, setSelectedProducts4] = useState<MenuList>(
    initializeMenuListState(4, 2)
  );
  const [selectedProductspotLight, setSelectedProductspotLight] =
    useState<MenuList>(initializeMenuListState(5, 1));
  const [currentListProduct, setCurrentListProduct] = useState<ProductData[]>(
    []
  );
  const [allSelectedProducts, setAllSelectedProducts] = useState<ProductData[]>(
    []
  );
  const brandId = Number(localStorage.getItem("BrandId"));
  const [currentListIndex, setCurrentIndex] = useState(0);
  const [maxProduct, setMaxProduct] = useState(0);
  const [categoryOptions, setCategoryOptions] = useState<CategoryData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [startCategory, setStartCategory] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<number>(1);

  const onOpenCreateMenu = () => setIsOpenCreateMenu(true);
  const onCloseCreateMenu = () => setIsOpenCreateMenu(false);

  const onOpenListProduct = (Index: number) => {
    setCurrentIndex(Index);
    switch (Index) {
      case 1:
        setCurrentListProduct(selectedProducts1.productData);
        setMaxProduct(4);
        break;
      case 2:
        setCurrentListProduct(selectedProducts2.productData);
        setMaxProduct(4);
        break;
      case 3:
        setCurrentListProduct(selectedProducts3.productData);
        setMaxProduct(4);
        break;
      case 4:
        setCurrentListProduct(selectedProducts4.productData);
        setMaxProduct(2);
        break;
      case 5:
        setCurrentListProduct(selectedProductspotLight.productData);
        setMaxProduct(1);
        break;
    }
    const allSelectedProducts = [
      ...selectedProducts1.productData,
      ...selectedProducts2.productData,
      ...selectedProducts3.productData,
      ...selectedProducts4.productData,
      ...selectedProductspotLight.productData,
    ];
    handleChangeProductByCate(startCategory);
    setAllSelectedProducts(allSelectedProducts);
    setIsOpenListProduct(true);
  };

  const onCloseListProduct = () => setIsOpenListProduct(false);

  const handleAddToMenu = (
    products: ProductData[],
    Index: number,
    maxProduct: number
  ) => {
    const newMenuList: MenuList = {
      listName: "",
      productData: products,
      listIndex: Index,
      maxProduct: maxProduct,
    };
    switch (Index) {
      case 1:
        setSelectedProducts1(newMenuList);
        break;
      case 2:
        setSelectedProducts2(newMenuList);
        break;
      case 3:
        setSelectedProducts3(newMenuList);
        break;
      case 4:
        setSelectedProducts4(newMenuList);
        break;
      case 5:
        newMenuList.listName = newMenuList.productData[0].productName;
        setSelectedProductspotLight(newMenuList);
        break;
    }
    onCloseListProduct();
  };

  const handleChangeProductByCate = (cateId: number) => {
    const loadData = async () => {
      try {
        const result = await getProductsByCategory(brandId, cateId);
        if (result) {
          setProducts(result.list);
          setCurrentCategory(cateId);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        toast.error("Error fetching data");
      }
    };

    loadData();
  };

  const checkListNamesNotEmpty = () => {
    return (
      selectedProducts1.listName.trim() !== "" &&
      selectedProducts2.listName.trim() !== "" &&
      selectedProducts3.listName.trim() !== "" &&
      selectedProducts4.listName.trim() !== ""
    );
  };

  const handleChangeTitle = (listName: string, Index: number) => {
    let updatedMenuList: MenuList;

    switch (Index) {
      case 1:
        updatedMenuList = {
          ...selectedProducts1,
          listName: listName,
        };
        setSelectedProducts1(updatedMenuList);
        break;
      case 2:
        updatedMenuList = {
          ...selectedProducts2,
          listName: listName,
        };
        setSelectedProducts2(updatedMenuList);
        break;
      case 3:
        updatedMenuList = {
          ...selectedProducts3,
          listName: listName,
        };
        setSelectedProducts3(updatedMenuList);
        break;
      case 4:
        updatedMenuList = {
          ...selectedProducts4,
          listName: listName,
        };
        setSelectedProducts4(updatedMenuList);
        break;
      case 5:
        updatedMenuList = {
          ...selectedProductspotLight,
          listName: selectedProductspotLight.productData[0].productName,
        };
        setSelectedProductspotLight(updatedMenuList);
        break;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCategoriesByBrandId(brandId);
        if (result) {
          setCategoryOptions(result.list);
          if (result.list.length > 0) {
            const initialCategoryId = result.list[0].categoryId;
            handleChangeProductByCate(initialCategoryId);
            setStartCategory(initialCategoryId);
            setCurrentCategory(initialCategoryId);
          }
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        toast.error("Error fetching data");
      }
    };

    loadData();
  }, []);

  const handleCreateMenu = async (menuForm: FormData) => {
    // const allListProducts: MenuList[] = [];
    // allListProducts.push(selectedProducts1);
    // allListProducts.push(selectedProducts2);
    // allListProducts.push(selectedProducts3);
    // allListProducts.push(selectedProducts4);
    // allListProducts.push(selectedProductspotLight);

    try {
      // setIsLoading(true);
      const menuResult = await createMenu(menuForm);

      if (menuResult.statusCode === 200) {
        const allListProducts: MenuList[] = [];
        allListProducts.push(selectedProducts1);
        allListProducts.push(selectedProducts2);
        allListProducts.push(selectedProducts3);
        allListProducts.push(selectedProducts4);
        allListProducts.push(selectedProductspotLight);

        const listPositionResult = await createListPosition(
          allListProducts,
          brandId
        );

        if (listPositionResult.statusCode === 200) {
          const listAddToMenu = listPositionResult.data.map((list, index) => ({
            listId: list.listId,
            listIndex: allListProducts[index].listIndex,
          }));

          const menuListResult = await createMenuList(
            menuResult.data.menuId,
            brandId,
            listAddToMenu
          );
          
          if (menuListResult.statusCode === 200) {
            toast.success("Thêm mới menu thành công");
          } else {
            toast.error(menuListResult.message);
          }
        } else {
          console.log(listPositionResult);

          toast.error(listPositionResult.message);
        }
      } else {
        console.log(menuResult);

        toast.error(menuResult.message);
      }
    } finally {
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
    }
  };

  const resetLists = () => {
    setSelectedProducts1({
      listName: "",
      productData: [],
      listIndex: 1,
      maxProduct: 4,
    });
    setSelectedProducts2({
      listName: "",
      productData: [],
      listIndex: 2,
      maxProduct: 4,
    });
    setSelectedProducts3({
      listName: "",
      productData: [],
      listIndex: 3,
      maxProduct: 4,
    });
    setSelectedProducts4({
      listName: "",
      productData: [],
      listIndex: 4,
      maxProduct: 2,
    });
    setSelectedProductspotLight({
      listName: "",
      productData: [],
      listIndex: 5,
      maxProduct: 2,
    });
    setAllSelectedProducts([]);
  };

  return (
    <Flex className={style.Container}>
      <Text as="b" fontSize="30px">
        Vui lòng chọn mẫu thực đơn
      </Text>
      <Flex className={style.CardContainer}>
        <Flex className={style.Card} bg="#E3F2F1" onClick={onOpenCreateMenu}>
          <Image className={style.MenuImg} src={fakeMenu} />
        </Flex>
      </Flex>
      <ModalFormCreateMenu
        isOpen={isOpenCreateMenu}
        onClose={onCloseCreateMenu}
        onOpenListProduct={onOpenListProduct}
        selectedProducts1={selectedProducts1}
        selectedProducts2={selectedProducts2}
        selectedProducts3={selectedProducts3}
        selectedProducts4={selectedProducts4}
        selectedProductspotLight={selectedProductspotLight}
        checkListNamesNotEmpty={checkListNamesNotEmpty}
        handleChangeTitle={handleChangeTitle}
        handleCreateMenu={handleCreateMenu}
        resetLists={resetLists}
      />
      <DrawerComponent
        isOpen={isOpenListProduct}
        onClose={onCloseListProduct}
        onAddToMenu={handleAddToMenu}
        IndexList={currentListIndex}
        products={products}
        allSelectedProducts={allSelectedProducts}
        currentListProducts={currentListProduct}
        MaxProduct={maxProduct}
        handleChangeProductByCate={handleChangeProductByCate}
        categoryOptions={categoryOptions}
        currentCategory={currentCategory}
      />
    </Flex>
  );
}

export default CreateMenu;
