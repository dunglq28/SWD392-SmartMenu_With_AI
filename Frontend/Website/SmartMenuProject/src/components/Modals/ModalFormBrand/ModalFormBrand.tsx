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
import { BrandData } from "../../../models/Brand.model";
import { themeColors } from "../../../constants/GlobalStyles";
import { isImageFile, isValidImageFileName } from "../../../utils/validation";

interface ModalFormBrandProps {
  brandData: BrandData;
  onClose: () => void;
  updateBrandData: (data: BrandData) => void;
  nextHandler?: () => void;
}

const ModalFormBrand: React.FC<ModalFormBrandProps> = ({
  brandData,
  onClose,
  updateBrandData,
  nextHandler,
}) => {
  const [formData, setFormData] = useState<BrandData>({
    brandName: { value: brandData.brandName.value, errorMessage: "" },
    image: { value: brandData.image.value, errorMessage: "" },
    imageName: { value: brandData.imageName.value, errorMessage: "" },
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
      imageName: { value: "", errorMessage: "" },
    }));
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      imageName: { value: e.target.value, errorMessage: "" },
    }));
  };

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      brandName: { value: e.target.value, errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    updateBrandData({
      brandName: { value: "", errorMessage: "" },
      image: { value: null, errorMessage: "" },
      imageName: { value: "", errorMessage: "" },
    });
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

    if (!formData.image.value && !formData.image.errorMessage) {
      setFormData((prevData) => ({
        ...prevData,
        image: {
          ...prevData.image,
          errorMessage: "Image is required",
        },
      }));
      hasError = true;
    }

    const fileNameValid = isValidImageFileName(formData.imageName.value);

    if (!fileNameValid) {
      setFormData((prevData) => ({
        ...prevData,
        imageName: {
          ...prevData.imageName,
          errorMessage: "Invalid image name",
        },
      }));
      hasError = true;
    }

    if (!hasError) {
      updateBrandData(formData);
      if (nextHandler) {
        nextHandler();
      }
    }
  };

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
              <Text className={styles.textFontWeight} py={3} pr={3}>
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
                <Text className={styles.textFontWeight} py={3} pr={3}>
                  Upload Brand Image
                </Text>
                <Flex align="center">
                  {!formData.image.value && (
                    <Input
                      type="file"
                      className={styles.inputImage}
                      onChange={handleImageChange}
                    />
                  )}
                  {formData.image.value && (
                    <Button onClick={handleRemoveImage} ml={3}>
                      Remove
                    </Button>
                  )}
                </Flex>
                {formData.image.value && (
                  <Box mt={2}>
                    <Input
                      pl={3}
                      value={formData.imageName.value}
                      onChange={handleFileNameChange}
                      placeholder="File Name"
                    />
                    {formData.imageName.errorMessage && (
                      <Text color="red.500">{formData.imageName.errorMessage}</Text>
                    )}
                  </Box>
                )}
                {formData.image.value && (
                  <Image
                    src={URL.createObjectURL(formData.image.value)}
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
            Next
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormBrand;
