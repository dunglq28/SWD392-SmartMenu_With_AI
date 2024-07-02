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
import { RiSettings3Line } from "react-icons/ri";

import style from "./ActionMenuCategory.module.scss";
import { useTranslation } from "react-i18next";
import CustomAlertDialog from "../../AlertDialog";
import ModalForm from "../../Modals/ModalForm/ModalForm";
import ModalFormCategory from "../../Modals/ModalFormCategory/ModalFormCategory";

interface ActionMenuProps {
  id: number;
  onDelete: (id: number) => void;
  onEdit: (cateId: number, brandId: number, categoryName: string) => void;
}

const ActionMenuCategory: FC<ActionMenuProps> = ({ id, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onClose: onCloseCategory,
  } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);

  return (
    <>
      <Flex className={style.SettingCategory}>
        <Popover>
          <PopoverTrigger>
            <Button className={style.SettingsIconBtn}>
              <Flex>
                <RiSettings3Line className={style.SettingsIcon} />
              </Flex>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={style.PopoverContent}>
            <PopoverArrow />
            <PopoverBody>
              <Divider />
              <Flex
                className={style.PopupButton}
                onClick={() => onOpenCategory()}
              >
                <Text>Edit Category</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text>Delete Category</Text>
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
        titleHeader="Delete Category"
        titleBody="Are you sure? You can't undo this action afterwards."
        btnName=" Delete"
      />

      <ModalForm
        formBody={
          <ModalFormCategory
            onClose={onCloseCategory}
            handleEdit={onEdit}
            isEdit={true}
            id={id}
          />
        }
        onClose={onCloseCategory}
        isOpen={isOpenCategory}
        title={t("Update Category")}
      />
    </>
  );
};

export default ActionMenuCategory;
