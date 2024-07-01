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
import { useEffect, useState } from "react";
import { CategoryData } from "../../../payloads/responses/CategoryData.model";
import { toast } from "react-toastify";

interface ModalFormBrandProps {
  onClose: () => void;
}

const ModalFormProduct: React.FC<ModalFormBrandProps> = ({ onClose }) => {
  const brandId = Number(localStorage.getItem("BrandId"));
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    async () => {
      try {
        let result;

        const loadData = async () => {
          result = await getCategoryByBrandId(brandId);
          setData(result.list);
        };

        setTimeout(loadData, 500);
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu");
      }
    };
  });

  const categoryOptions = data.map((category) => ({
    value: category.categoryId,
    label: category.categoryName,
  }));

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
