import React, { FC, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";

import style from "./ActionMenu.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ModalForm from "../Modals/ModalForm/ModalForm";
import ModalFormBrand from "../Modals/ModalFormBrand/ModalFormBrand";
import { BrandForm } from "../../models/BrandForm.model";
import { brandUpdate } from "../../payloads/requests/updateBrand.model";
import { getBrand } from "../../services/BrandService";
import CustomAlertDialog from "../AlertDialog";

interface ActionMenuProps {
  id: number;
  brandName: string;
  onDelete: (id: number) => void;
  onEdit: (brand: brandUpdate) => void;
}

const ActionMenu: FC<ActionMenuProps> = ({
  id,
  brandName,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenBrand,
    onOpen: onOpenBrand,
    onClose: onCloseBrand,
  } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);
  const navigate = useNavigate();
  //BRAND DATA
  const [brandData, setBrandData] = useState<BrandForm>({
    brandName: {
      value: "",
      errorMessage: "",
    },
    image: {
      value: null,
      errorMessage: "",
    },
  });

  const updateBrandData = (brand: BrandForm, isSave: boolean) => {
    var brandUpdate: brandUpdate = {
      id: id,
      brandName: brand.brandName.value,
      image: brand.image.value,
    };
    if (isSave) {
      onEdit(brandUpdate);
    }
  };

  const handleEditClick = async () => {
    var result = await getBrand(id);
    if (result.statusCode === 200) {
      const { brandName, imageUrl } = result.data;

      const updatedBrandData: BrandForm = {
        brandName: { value: brandName, errorMessage: "" },
        image: { value: null, errorMessage: "" },
        imageUrl: { value: imageUrl, errorMessage: "" },
      };
      setBrandData(updatedBrandData);
      onOpenBrand();
    }
  };

  const handleViewClick = () => {
    navigate(`/branches/${brandName}`, { state: { id, brandName } });
  };

  return (
    <>
      <Flex className={style.SettingBrand}>
        <Popover>
          <PopoverTrigger>
            <Button className={style.SettingsIconBtn}>
              <Flex>
                <MdOutlineMoreHoriz className={style.SettingsIcon} />
              </Flex>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={style.PopoverContent}>
            <PopoverArrow />
            <PopoverBody>
              <Flex className={style.PopupButton} onClick={handleViewClick}>
                <Text>View Branch</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={handleEditClick}>
                <Text>Edit Brand</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text>Delete Brand</Text>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <CustomAlertDialog
        onClose={onClose}
        isOpen={isOpen}
        id={id}
        onDelete={onDelete}
        titleHeader="Delete Brand"
        titleBody="Are you sure? You can't undo this action afterwards."
        btnName=" Delete"
      />

      <ModalForm
        formBody={
          <ModalFormBrand
            brandData={brandData}
            onClose={onCloseBrand}
            isEdit={true}
            updateBrandData={updateBrandData}
          />
        }
        onClose={onCloseBrand}
        isOpen={isOpenBrand}
        title={t("Update Brand")}
        updateBrandData={updateBrandData}
      />
    </>
  );
};

export default ActionMenu;
