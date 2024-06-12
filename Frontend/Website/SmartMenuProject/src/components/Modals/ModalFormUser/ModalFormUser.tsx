import React, { useState } from "react";
import {
  ModalBody,
  Flex,
  Box,
  Select,
  Input,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import styles from "./ModalFormUser.module.scss";
import { themeColors } from "../../../constants/GlobalStyles";
import { CurrentForm } from "../../../constants/Enum";
import { BrandData } from "../../../models/Brand.model";
import { UserForm } from "../../../models/User.model";
import { isValidPhoneNumber } from "../../../utils/validation";
import { generateUsername } from "../../../utils/createBrandName";

interface ModalFormBrandProps {
  isEdit: boolean;
  onClose: () => void;
  formPrevious?: CurrentForm;
  onOpenStore?: () => void;
  onOpenBrand?: () => void;
  updateBrandData?: (data: BrandData) => void;
  updateUserData: (data: UserForm) => void;
  saveBrandHandle?: (data: UserForm) => void;
  brandName?: string;
  userData: UserForm;
}

const ModalFormUser: React.FC<ModalFormBrandProps> = ({
  isEdit,
  onClose,
  formPrevious,
  onOpenStore,
  onOpenBrand,
  updateBrandData,
  updateUserData,
  saveBrandHandle,
  brandName,
  userData,
}) => {
  const initialUserNameValue = brandName ? generateUsername(brandName) : userData.userName.value;
  const [formData, setFormData] = useState<UserForm>({
    fullName: { value: userData.fullName.value, errorMessage: "" },
    userName: {
      value: initialUserNameValue,
      errorMessage: "",
    },
    phoneNumber: { value: userData.phoneNumber.value, errorMessage: "" },
    DOB: { value: userData.DOB.value, errorMessage: "" },
    gender: { value: userData.gender.value || "Male", errorMessage: "" },
    isActive: { value: userData.isActive.value || 1, errorMessage: "" },
  });

  const handleInputChange = (field: keyof UserForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleDateChange = (field: keyof UserForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { value: new Date(value), errorMessage: "" },
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: { value, errorMessage: "" },
    }));
  };

  const handleIsActiveChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      isActive: { value: Number(value), errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    if (formPrevious === CurrentForm.BRAND) {
      updateBrandData?.({
        brandName: { value: "", errorMessage: "" },
        image: { value: null, errorMessage: "" },
      });
    }
    updateUserData?.({
      fullName: { value: "", errorMessage: "" },
      userName: { value: "", errorMessage: "" },
      phoneNumber: { value: "", errorMessage: "" },
      DOB: { value: null, errorMessage: "" },
      gender: { value: "", errorMessage: "" },
      isActive: { value: null, errorMessage: "" },
    });
    onClose();
  };

  const openFormPreviousHandler = () => {
    onClose();
    setTimeout(() => {
      if (formPrevious === CurrentForm.BRAND) {
        onOpenBrand?.();
      } else {
        onOpenStore?.();
      }
      updateUserData?.(formData);
    }, 350);
  };

  const handleSaveForm = () => {
    let hasError = false;

    if (formData.fullName.value.trim() === "") {
      setFormData((prevData) => ({
        ...prevData,
        fullName: {
          ...prevData.fullName,
          errorMessage: "Full Name is required",
        },
      }));
      hasError = true;
    } else if (formData.fullName.value.trim().length < 6) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: {
          ...prevData.fullName,
          errorMessage: "Full Name must be at least 6 characters",
        },
      }));
      hasError = true;
    }

    if (formData.phoneNumber.value.trim() === "") {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: {
          ...prevData.phoneNumber,
          errorMessage: "Phone Number is required",
        },
      }));
      hasError = true;
    } else if (!isValidPhoneNumber(formData.phoneNumber.value.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: {
          ...prevData.phoneNumber,
          errorMessage: "Invalid phone number",
        },
      }));
      hasError = true;
    }

    if (!formData.DOB.value) {
      setFormData((prevData) => ({
        ...prevData,
        DOB: {
          ...prevData.DOB,
          errorMessage: "Date of Birth is required",
        },
      }));
      hasError = true;
    }

    if (!hasError) {
      // console.log(formData);
      // updateUserData(formData);
      if (isEdit) {
        updateUserData(formData);
      } else {
        saveBrandHandle?.(formData);
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
                Full Name
              </Text>
              <Input
                placeholder="Full name"
                pl={3}
                value={formData.fullName.value}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
              {formData.fullName.errorMessage && (
                <Text color="red.500">{formData.fullName.errorMessage}</Text>
              )}
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Username
              </Text>
              <Input
                readOnly
                placeholder="Username"
                pl={3}
                value={formData.userName.value}
              />
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3} ml={2}>
            <Box flex="1">
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Phone Number
              </Text>
              <Input
                placeholder="Phone number"
                pl={3}
                value={formData.phoneNumber.value}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
              {formData.phoneNumber.errorMessage && (
                <Text color="red.500">{formData.phoneNumber.errorMessage}</Text>
              )}
            </Box>

            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Date of Birth
              </Text>
              <Input
                type="date"
                pl={3}
                value={
                  formData.DOB.value
                    ? formData.DOB.value.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleDateChange("DOB", e.target.value)}
              />
              {formData.DOB.errorMessage && (
                <Text color="red.500">{formData.DOB.errorMessage}</Text>
              )}
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3} mb={2}>
                Gender
              </Text>
              <RadioGroup
                value={formData.gender.value}
                onChange={handleGenderChange}
              >
                <Stack spacing={5} direction="row" ml={3}>
                  <Radio value="Male">
                    <Text className={styles.genderText}>Male</Text>
                  </Radio>
                  <Radio value="Female">
                    <Text className={styles.genderText}>Female</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Is Active
              </Text>
              <Select
                id="isActive"
                className={styles.isActive}
                value={formData.isActive.value ?? ""}
                onChange={(e) => handleIsActiveChange(e.target.value)}
              >
                <option disabled hidden value="">
                  Select one
                </option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Select>
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent={isEdit ? "flex-end" : "space-between"}>
        {!isEdit && (
          <Button
            backgroundColor={themeColors.primaryButton}
            color="white"
            onClick={openFormPreviousHandler}
          >
            Back
          </Button>
        )}

        <Flex>
          <Button
            backgroundColor={themeColors.primaryButton}
            color="white"
            mr={3}
            onClick={cancelHandler}
          >
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleSaveForm}>
            Save
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormUser;
