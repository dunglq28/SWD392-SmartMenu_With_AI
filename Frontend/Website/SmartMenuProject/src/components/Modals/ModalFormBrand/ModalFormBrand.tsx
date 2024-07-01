import React, { useState } from "react";
import {
  ModalBody,
  Flex,
  Box,
  Input,
  Text,
  Image,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

import styles from "./ModalFormBrand.module.scss";
import { BrandForm } from "../../../models/BrandForm.model";
import { themeColors } from "../../../constants/GlobalStyles";
import { isImageFile } from "../../../utils/validation";

interface ModalFormBrandProps {
  brandData: BrandForm;
  onClose: () => void;
  updateBrandData: (brand: BrandForm, isSave: boolean) => void;
  nextHandler?: () => void;
  isEdit: boolean;
}

const ModalFormBrand: React.FC<ModalFormBrandProps> = ({
  brandData,
  onClose,
  updateBrandData,
  nextHandler,
  isEdit,
}) => {
  const [formData, setFormData] = useState<BrandForm>({
    brandName: { value: brandData.brandName.value, errorMessage: "" },
    image: { value: brandData.image.value, errorMessage: "" },
    imageUrl: {
      value: brandData.imageUrl?.value ? brandData.imageUrl?.value : "",
      errorMessage: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isImage = isImageFile(file);

      if (!isImage) {
        setFormData((prevData) => ({
          ...prevData,
          image: { value: null, errorMessage: "File must be an image" },
        }));
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        image: { value: file, errorMessage: "" },
        imageName: { value: file.name, errorMessage: "" },
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: { value: null, errorMessage: "" },
      imageUrl: { value: "", errorMessage: "" },
    }));
  };

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      brandName: { value: e.target.value, errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    updateBrandData?.(
      {
        brandName: { value: "", errorMessage: "" },
        image: { value: null, errorMessage: "" },
      },
      false
    );
    onClose();
  };

  const handleNextForm = () => {
    let hasError = false;

    if (formData.brandName.value.length < 1) {
      setFormData((prevData) => ({
        ...prevData,
        brandName: {
          ...prevData.brandName,
          errorMessage: "Brand Name is required",
        },
      }));
      hasError = true;
    }

    if (
      !formData.image.value &&
      !formData.imageUrl?.value &&
      !formData.image.errorMessage
    ) {
      setFormData((prevData) => ({
        ...prevData,
        image: {
          ...prevData.image,
          errorMessage: "Image is required",
        },
      }));
      hasError = true;
    }

    if (!hasError) {
      updateBrandData?.(formData, true);
      if (nextHandler) {
        nextHandler();
      }
    }
  };

  const imageUrl = formData.image.value
    ? URL.createObjectURL(formData.image.value)
    : formData.imageUrl?.value;

  return (
    <>
      <ModalBody>
        <Flex
          direction="column"
          alignItems="stretch"
          className={styles.containerForm}
        >
          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Brand Name
              </Text>
              <Input
                value={formData.brandName.value}
                onChange={handleBrandNameChange}
                placeholder="Brand Name"
                pl={3}
              />
              {formData.brandName.errorMessage && (
                <Text color="red.500">{formData.brandName.errorMessage}</Text>
              )}
              <Box mt={2}>
                <Text className={styles.textFontWeight600} py={3} pr={3}>
                  Upload Brand Logo
                </Text>
                <Flex align="center">
                  {!formData.image.value && !formData.imageUrl?.value && (
                    <Input
                      type="file"
                      className={styles.inputImage}
                      onChange={handleImageChange}
                    />
                  )}
                  {(formData.image.value ||
                    (formData.imageUrl && formData.imageUrl.value)) && (
                    <Button onClick={handleRemoveImage} ml={3}>
                      Remove
                    </Button>
                  )}
                </Flex>
                {(formData.image.value ||
                  (formData.imageUrl && formData.imageUrl.value)) && (
                  <Image
                    src={imageUrl}
                    alt="Image Preview"
                    className={styles.imagePreview}
                  />
                )}
                {formData.image.errorMessage && (
                  <Text color="red.500">{formData.image.errorMessage}</Text>
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex>
          <Button
            backgroundColor={themeColors.primaryButton}
            color="white"
            mr={3}
            onClick={cancelHandler}
          >
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleNextForm}>
            {isEdit ? "Save" : "Next"}
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormBrand;
