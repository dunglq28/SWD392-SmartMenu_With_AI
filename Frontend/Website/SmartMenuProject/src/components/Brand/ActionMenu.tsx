import React, { FC, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { BrandData } from "../../models/Brand.model";
import { brandUpdate } from "../../payloads/requests/updateBrand.model";

interface ActionMenuProps {
  id: number;
  brandName: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, brand: brandUpdate) => void;
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
  const [brandData, setBrandData] = useState<BrandData>({
    brandName: {
      value: "",
      errorMessage: "",
    },
    image: {
      value: null,
      errorMessage: "",
    },
  });

  const updateBrandData = (brand: BrandData) => {
    var brandUpdate: brandUpdate = {
      brandName: brand.brandName.value,
      image: brand.image.value,
    };
    // onCloseUser();
    onEdit(id, brandUpdate);
  };

  const handleEditClick = () => {
    onOpenBrand();
  };

  const handleViewClick = () => {
    navigate(`/branches/${brandName}`);
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Brand
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDelete(id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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
