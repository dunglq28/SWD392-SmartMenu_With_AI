import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import style from "./ModalFormProduct.module.scss";
import Select from "react-select";
import { getCategoryByBrandId } from "../../../services/CategoryService";
import { toast } from "react-toastify";

interface ModalFormBrandProps {
  onClose: () => void;
}

interface CategoryDataSelection {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
}

const ModalFormProduct: React.FC<ModalFormBrandProps> = ({ onClose }) => {
  const brandId = Number(localStorage.getItem("BrandId"));
  const [categoryOptions, setCategoryOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCategoryByBrandId(brandId);
        if (result && Array.isArray(result)) {
          const categories: CategoryDataSelection[] = result.map(
            (category) => ({
              categoryId: category.categoryId,
              categoryCode: category.categoryCode,
              categoryName: category.categoryName,
            })
          );

          const options = categories.map((category) => ({
            value: category.categoryId,
            label: category.categoryName,
          }));
          setCategoryOptions(options);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Error fetching data");
      }
    };

    loadData();
  }, [brandId]);

  return (
    <>
      <ModalBody>
        <Flex className={style.ModalBody}>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Category</Text>
            <Select
              options={categoryOptions}
              closeMenuOnSelect={true}
              className={style.FlavourSelect}
              // onChange={handleLanguageChange}
            />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Product Name</Text>
            <Input className={style.InputField} placeholder="Product name" />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Spotlight Video</Text>
            <Input className={style.InputFileField} type="file" />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Image</Text>
            <Input className={style.InputFileField} type="file" />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Description</Text>
            <Input className={style.InputField} placeholder="Description" />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Price</Text>
            <Input className={style.InputField} placeholder="Price" />
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex className={style.Footer}>
          <Button className={style.AddProductBtn}>Add product</Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormProduct;
