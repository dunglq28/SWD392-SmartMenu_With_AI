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
import { UserData } from "../../../models/User.model";
import { isValidPhoneNumber } from "../../../utils/validation";
import { generateUsername } from "../../../utils/createBrandName";

interface ModalFormBrandProps {
  onClose: () => void;
  formPrevious: CurrentForm;
  onOpenStore: () => void;
  onOpenBrand: () => void;
  updateBrandData: (data: BrandData) => void;
  updateUserData: (data: UserData) => void;
  saveBrandHandle: (data: UserData) => void;
  brandName: string;
}

const ModalFormUser: React.FC<ModalFormBrandProps> = ({
  onClose,
  formPrevious,
  onOpenStore,
  onOpenBrand,
  updateBrandData,
  updateUserData,
  saveBrandHandle,
  brandName,
}) => {
  const [formData, setFormData] = useState<UserData>({
    fullName: { value: "", errorMessage: "" },
    userName: { value: generateUsername(brandName), errorMessage: "" },
    phoneNumber: { value: "", errorMessage: "" },
    DOB: { value: null, errorMessage: "" },
    gender: { value: "Male", errorMessage: "" },
    status: { value: null, errorMessage: "" },
  });

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleDateChange = (field: keyof UserData, value: string) => {
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

  const handleStatusChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      status: { value: Number(value), errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    if (formPrevious === CurrentForm.BRAND) {
      updateBrandData({
        brandName: { value: "", errorMessage: "" },
        image: { value: null, errorMessage: "" },
        imageName: { value: "", errorMessage: "" },
      });
    }
    updateUserData({
      fullName: { value: "", errorMessage: "" },
      userName: { value: "", errorMessage: "" },
      phoneNumber: { value: "", errorMessage: "" },
      DOB: { value: null, errorMessage: "" },
      gender: { value: "", errorMessage: "" },
      status: { value: null, errorMessage: "" },
    });
    onClose();
  };

  const openFormPreviousHandler = () => {
    onClose();
    setTimeout(() => {
      if (formPrevious === CurrentForm.BRAND) {
        onOpenBrand();
      } else {
        onOpenStore();
      }
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

    if (formData.gender.value.trim() === "") {
      setFormData((prevData) => ({
        ...prevData,
        gender: {
          ...prevData.gender,
          errorMessage: "Gender is required",
        },
      }));
      hasError = true;
    }

    if (formData.status.value === null) {
      setFormData((prevData) => ({
        ...prevData,
        status: {
          ...prevData.status,
          errorMessage: "Status is required",
        },
      }));
      hasError = true;
    }

    if (!hasError) {    
      // console.log(formData);
      // updateUserData(formData);
      
      saveBrandHandle(formData);
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
              {formData.gender.errorMessage && (
                <Text color="red.500">{formData.gender.errorMessage}</Text>
              )}
            </Box>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Status
              </Text>
              <Select
                id="status"
                className={styles.status}
                value={formData.status.value ?? ""}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option disabled hidden value="">
                  Select one
                </option>
                <option value="1">
                  Active
                </option>
                <option value="0">Inactive</option>
              </Select>
              {formData.status.errorMessage && (
                <Text color="red.500">{formData.status.errorMessage}</Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent="space-between">
        <Button
          backgroundColor={themeColors.primaryButton}
          color="white"
          onClick={openFormPreviousHandler}
        >
          Back
        </Button>

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
