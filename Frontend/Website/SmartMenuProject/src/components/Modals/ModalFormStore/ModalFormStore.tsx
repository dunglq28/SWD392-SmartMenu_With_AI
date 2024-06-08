import React, { MouseEventHandler, useState } from "react";
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

import styles from "./ModalFormStore.module.scss";
import { BrandData } from "../../../models/Brand.model";
import { themeColors } from "../../../constants/GlobalStyles";

interface ModalFormBrandProps {
  onClose: () => void;
  updateBrandData: (data: BrandData) => void;
  nextHandler?: () => void;
}

const ModalFormStore: React.FC<ModalFormBrandProps> = ({
  onClose,
  updateBrandData,
  nextHandler,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const [fileName, setFileName] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setInputKey(Date.now());
    setFileName("");
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  function cancelHandler() {
    onClose();
  }

  function handleNextForm() {
    if (nextHandler) {
      nextHandler();
    }
  }

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
              <Input placeholder="Brand Name" pl={3} />
              <Box mt={2}>
                <Text className={styles.textFontWeight} py={3} pr={3}>
                  Upload Brand Image
                </Text>
                <Flex align="center">
                  {!selectedImage && (
                    <Input
                      type="file"
                      key={inputKey}
                      className={styles.inputImage}
                      onChange={handleImageChange}
                    />
                  )}
                  {selectedImage && (
                    <Button onClick={handleRemoveImage} ml={3}>
                      Remove
                    </Button>
                  )}
                </Flex>
                {selectedImage && (
                  <Box mt={2}>
                    <Input
                      pl={3}
                      value={fileName}
                      onChange={handleFileNameChange}
                      placeholder="File Name"
                    />
                  </Box>
                )}
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    className={styles.imagePreview}
                  />
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

export default ModalFormStore;
