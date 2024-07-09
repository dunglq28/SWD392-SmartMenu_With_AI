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
import { MenuList } from "../../../models/MenuList.model";

function CreateMenu() {
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState(false);
  const [isOpenListProduct, setIsOpenListProduct] = useState(false);
  const [selectedProducts1, setSelectedProducts1] = useState<MenuList>({
    listName: "",
    productData: [],
    listIndex: 1,
  });
  const [selectedProducts2, setSelectedProducts2] = useState<MenuList>({
    listName: "",
    productData: [],
    listIndex: 2,
  });
  const [selectedProducts3, setSelectedProducts3] = useState<MenuList>({
    listName: "",
    productData: [],
    listIndex: 3,
  });
  const [selectedProducts4, setSelectedProducts4] = useState<MenuList>({
    listName: "",
    productData: [],
    listIndex: 4,
  });
  const [selectedProductspotLight, setSelectedProductspotLight] =
    useState<MenuList>({ listName: "", productData: [], listIndex: 5 });
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

  const handleAddToMenu = (products: ProductData[], Index: number) => {
    const newMenuList: MenuList = {
      listName: "",
      productData: products,
      listIndex: Index,
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

  const resetLists = () => {
    setSelectedProducts1({ listName: "", productData: [], listIndex: 1 });
    setSelectedProducts2({ listName: "", productData: [], listIndex: 2 });
    setSelectedProducts3({ listName: "", productData: [], listIndex: 3 });
    setSelectedProducts4({ listName: "", productData: [], listIndex: 4 });
    setSelectedProductspotLight({
      listName: "",
      productData: [],
      listIndex: 5,
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
        selectedProducts1={selectedProducts1.productData}
        selectedProducts2={selectedProducts2.productData}
        selectedProducts3={selectedProducts3.productData}
        selectedProducts4={selectedProducts4.productData}
        selectedProductspotLight={selectedProductspotLight.productData}
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
