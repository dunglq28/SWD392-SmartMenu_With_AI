import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import style from "./ModalFormCategory.module.scss";
import { toast } from "react-toastify";
import { CategoryForm } from "../../../models/CategoryForm";
import moment from "moment";
import { getCategory } from "../../../services/CategoryService";

interface ModalFormCategoryProps {
  id?: number;
  handleCreate?: (id: number, categoryName: string) => void;
  handleEdit?: (cateId: number, brandId: number, categoryName: string) => void;
  onClose: () => void;
  isEdit: boolean;
}

const ModalFormCategory: React.FC<ModalFormCategoryProps> = ({
  id,
  onClose,
  handleCreate,
  isEdit,
  handleEdit,
}) => {
  const brandId = Number(localStorage.getItem("BrandId"));
  const [formData, setFormData] = useState<CategoryForm>({
    categoryName: { value: "", errorMessage: "" },
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadCategoryData = async () => {
        try {
          const category = await getCategory(id);
          if (category) {
            setFormData({
              categoryName: {
                value: category.data.categoryName,
                errorMessage: "",
              },
            });
          } else {
            throw new Error("Category not found");
          }
        } catch (err) {
          console.error("Error fetching category data:", err);
          toast.error("Error fetching category data");
        }
      };

      loadCategoryData();
    }
  }, []);

  const handleChange = (field: keyof CategoryForm, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async () => {
    const errors = {
      categoryName: formData.categoryName.value
        ? ""
        : "Category name is required",
    };

    const updatedFormData = {
      categoryName: {
        ...formData.categoryName,
        errorMessage: errors.categoryName,
      },
    };

    setFormData(updatedFormData);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      const capitalizedCategoryName = capitalizeWords(
        formData.categoryName.value
      );
      if (!isEdit) {
        handleCreate?.(brandId, capitalizedCategoryName);
      } else {
        handleEdit?.(id!, brandId, capitalizedCategoryName);
        onClose();
      }
    }
  };

  return (
    <>
      <ModalBody>
        <Flex className={style.ModalBody}>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Category Name</Text>
            <Input
              className={style.InputField}
              placeholder="Category name"
              value={formData.categoryName.value}
              onChange={(e) => handleChange("categoryName", e.target.value)}
            />
            {formData.categoryName.errorMessage && (
              <Text className={style.ErrorText}>
                {formData.categoryName.errorMessage}
              </Text>
            )}
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>
              {" "}
              {isEdit ? "Update on" : "Create on"}
            </Text>
            <Input
              className={style.InputField}
              readOnly={true}
              value={moment(new Date().toISOString().split("T")[0]).format(
                "DD/MM/YYYY"
              )}
            />
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex className={style.Footer}>
          <Button onClick={() => onClose()}>
            Cancel
          </Button>
          <Button className={style.AddCategoryBtn} onClick={handleSubmit}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormCategory;
