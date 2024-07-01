import React, { useEffect, useState } from "react";
import {
  ModalBody,
  Flex,
  Box,
  Input,
  Text,
  Button,
  ModalFooter,
  Select,
} from "@chakra-ui/react";

import styles from "./ModalFormBranch.module.scss";
import { themeColors } from "../../../constants/GlobalStyles";
import { BranchForm } from "../../../models/BranchForm.model";
import { City } from "../../../models/City.model";
import { District } from "../../../models/District.model";
import { Ward } from "../../../models/Ward.model";
import {
  fetchCities,
  fetchDistricts,
  fetchWards,
} from "../../../services/ThirdService";
import Loading from "../../Loading";
import { BrandData } from "../../../payloads/responses/BrandData.model";
import { getAllBrandName } from "../../../services/BrandService";

interface ModalFormBranchProps {
  branchData: BranchForm;
  onClose: () => void;
  updateBranchData: (data: BranchForm, isSave: boolean) => void;
  nextHandler?: () => void;
  isEdit: boolean;
}

const ModalFormBranch: React.FC<ModalFormBranchProps> = ({
  branchData,
  onClose,
  updateBranchData,
  nextHandler,
  isEdit,
}) => {
  const [formData, setFormData] = useState<BranchForm>({
    brandName: {
      id: branchData.brandName.id,
      value: branchData.brandName.value || "",
      errorMessage: "",
    },
    city: {
      id: branchData.city.id,
      name: branchData.city.name || "",
      errorMessage: "",
    },
    district: {
      id: branchData.district.id,
      name: branchData.district.name || "",
      errorMessage: "",
    },
    ward: {
      id: branchData.ward.id,
      name: branchData.ward.name || "",
      errorMessage: "",
    },
    address: { value: branchData.address.value || "", errorMessage: "" },
  });
  const [brandNames, setBrandNames] = useState<BrandData[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cities
        const cityData = await fetchCities();
        setCities(cityData);

        // Fetch brand names if not in edit mode
        if (!isEdit) {
          const brandNamesData = await getAllBrandName();
          setBrandNames(brandNamesData.data);
        }

        // Set city ID if not already set
        if (formData.city.name && formData.city.id === "") {
          const cityId = cityData.find(
            (city) => city.name === formData.city.name
          )?.id;
          setFormData((prevData) => ({
            ...prevData,
            city: {
              ...prevData.city,
              id: cityId || "",
            },
          }));
        }

        // Fetch districts if city ID is set
        if (formData.city.id) {
          const districtData = await fetchDistricts(formData.city.id);
          setDistricts(districtData);

          // Set district ID if not already set
          if (formData.district.name && formData.district.id === "") {
            const districtId = districtData.find(
              (district) => district.name === formData.district.name
            )?.id;
            setFormData((prevData) => ({
              ...prevData,
              district: {
                ...prevData.district,
                id: districtId || "",
              },
            }));
          }
        }

        // Fetch wards if district ID is set
        if (formData.district.id) {
          const wardData = await fetchWards(formData.district.id);
          setWards(wardData);

          // Set ward ID if not already set
          if (formData.ward.name && formData.ward.id === "") {
            const wardId = wardData.find(
              (ward) => ward.name === formData.ward.name
            )?.id;
            setFormData((prevData) => ({
              ...prevData,
              ward: {
                ...prevData.ward,
                id: wardId || "",
              },
            }));
          }
          setIsLoading(false);
        }

        if (!isEdit) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formData.city.id, formData.district.id]);

  const handleCityChange = async (citySelected: string) => {
    try {
      const cityId = citySelected.split(",")[0].trim();
      const districtData = await fetchDistricts(cityId);
      setDistricts(districtData);
      setFormData((prevData) => ({
        ...prevData,
        city: {
          id: cityId,
          name: citySelected.split(",")[1].trim(),
          errorMessage: "",
        },
        district: { id: "", name: "", errorMessage: "" },
        ward: { id: "", name: "", errorMessage: "" },
      }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (districtSelected: string) => {
    try {
      const districtId = districtSelected.split(",")[0].trim();
      const wardData = await fetchWards(districtId);
      setWards(wardData);
      setFormData((prevData) => ({
        ...prevData,
        district: {
          id: districtId,
          name: districtSelected.split(",")[1].trim(),
          errorMessage: "",
        },
        ward: { id: "", name: "", errorMessage: "" },
      }));
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleWardChange = async (wardSelected: string) => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        ward: {
          id: wardSelected.split(",")[0].trim(),
          name: wardSelected.split(",")[1].trim(),
          errorMessage: "",
        },
      }));
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let trimmedValue = value;
    let id = "";

    if (
      field === "city" ||
      field === "district" ||
      field === "ward" ||
      field === "brandName"
    ) {
      const commaIndex = value.indexOf(",");
      if (commaIndex !== -1) {
        id = value.substring(0, commaIndex).trim();
        trimmedValue = value.substring(commaIndex + 1).trim();
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: { id, value: trimmedValue, errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    updateBranchData(
      {
        brandName: { id: "", value: "", errorMessage: "" },
        city: { id: "", name: "", errorMessage: "" },
        district: { id: "", name: "", errorMessage: "" },
        ward: { id: "", name: "", errorMessage: "" },
        address: { value: "", errorMessage: "" },
      },
      false
    );
    onClose();
  };

  const handleNextForm = () => {
    let hasError = false;

    if (!formData.brandName.value) {
      setFormData((prevData) => ({
        ...prevData,
        brandName: {
          ...prevData.brandName,
          errorMessage: "Brand Name is required",
        },
      }));
      hasError = true;
    }

    if (!formData.city.name) {
      setFormData((prevData) => ({
        ...prevData,
        city: {
          ...prevData.city,
          errorMessage: "City is required",
        },
      }));
      hasError = true;
    }

    if (!formData.district.name) {
      setFormData((prevData) => ({
        ...prevData,
        district: {
          ...prevData.district,
          errorMessage: "District is required",
        },
      }));
      hasError = true;
    }

    if (!formData.ward.name) {
      setFormData((prevData) => ({
        ...prevData,
        ward: {
          ...prevData.ward,
          errorMessage: "Ward is required",
        },
      }));
      hasError = true;
    }

    if (!formData.address.value) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          errorMessage: "Address is required",
        },
      }));
      hasError = true;
    }

    if (!hasError) {
      updateBranchData(formData, true);
      if (nextHandler) {
        nextHandler();
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Flex w="100%" h="465px" justifyContent="center" alignItems="center">
          <Loading />
        </Flex>
      ) : (
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
                  {isEdit ? (
                    <Input
                      pl={3}
                      value={formData.brandName.value}
                      readOnly={true}
                    />
                  ) : (
                    <Select
                      id="brandName"
                      className={styles.isActive}
                      value={`${formData.brandName.id}, ${formData.brandName.value}`}
                      onChange={(e) =>
                        handleInputChange("brandName", e.target.value)
                      }
                      placeholder="Select brand"
                    >
                      {brandNames.map((brandName) => (
                        <option
                          key={brandName.brandId}
                          value={`${brandName.brandId}, ${brandName.brandName}`}
                        >
                          {brandName.brandName}
                        </option>
                      ))}
                    </Select>
                  )}
                  {formData.brandName.errorMessage && (
                    <Text color="red.500">
                      {formData.brandName.errorMessage}
                    </Text>
                  )}

                  <Text className={styles.textFontWeight600} py={3} pr={3}>
                    City
                  </Text>
                  <Select
                    id="city"
                    className={styles.isActive}
                    value={`${formData.city.id}, ${formData.city.name}`}
                    onChange={(e) => {
                      handleInputChange("city", e.target.value);
                      handleCityChange(e.target.value);
                    }}
                    placeholder="Select city"
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={`${city.id}, ${city.name}`}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                  {formData.city.errorMessage && (
                    <Text color="red.500">{formData.city.errorMessage}</Text>
                  )}

                  <Flex justify="space-between" mb={3}>
                    <Box flex="1">
                      <Text className={styles.textFontWeight600} py={3} pr={3}>
                        District
                      </Text>
                      <Select
                        id="district"
                        className={styles.isActive}
                        value={`${formData.district.id}, ${formData.district.name}`}
                        onChange={(e) => {
                          handleInputChange("district", e.target.value);
                          handleDistrictChange(e.target.value);
                        }}
                        placeholder="Select district"
                      >
                        {districts.map((district) => (
                          <option
                            key={district.id}
                            value={`${district.id}, ${district.name}`}
                          >
                            {district.name}
                          </option>
                        ))}
                      </Select>
                      {formData.district.errorMessage && (
                        <Text color="red.500">
                          {formData.district.errorMessage}
                        </Text>
                      )}
                    </Box>

                    <Box flex="1" ml={3}>
                      <Text className={styles.textFontWeight600} py={3} pr={3}>
                        Ward
                      </Text>
                      <Select
                        id="ward"
                        className={styles.isActive}
                        value={`${formData.ward.id}, ${formData.ward.name}`}
                        onChange={(e) => {
                          handleInputChange("ward", e.target.value);
                          handleWardChange(e.target.value);
                        }}
                        placeholder="Select ward"
                      >
                        {wards.map((ward) => (
                          <option
                            key={ward.id}
                            value={`${ward.id}, ${ward.name}`}
                          >
                            {ward.name}
                          </option>
                        ))}
                      </Select>
                      {formData.ward.errorMessage && (
                        <Text color="red.500">
                          {formData.ward.errorMessage}
                        </Text>
                      )}
                    </Box>
                  </Flex>

                  <Text className={styles.textFontWeight600} py={3} pr={3}>
                    Address
                  </Text>
                  <Input
                    placeholder="Address"
                    pl={3}
                    value={formData.address.value}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                  {formData.address.errorMessage && (
                    <Text color="red.500">{formData.address.errorMessage}</Text>
                  )}
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
      )}
    </>
  );
};

export default ModalFormBranch;
