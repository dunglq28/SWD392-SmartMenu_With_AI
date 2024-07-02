import React, { FC } from "react";
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
import style from "./ActionMenuProduct.module.scss";
import { useTranslation } from "react-i18next";
import CustomAlertDialog from "../../AlertDialog";
import ModalForm from "../../Modals/ModalForm/ModalForm";
import ModalFormProduct from "../../Modals/ModalFormProduct/ModalFormProduct";

interface ActionMenuProps {
  id: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, product: FormData) => void;
}

const ActionMenuProduct: FC<ActionMenuProps> = ({ id, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProduct,
    onOpen: onOpenProduct,
    onClose: onCloseProduct,
  } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);

  return (
    <>
      <Flex className={style.SettingBranch}>
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
              <Flex className={style.PopupButton} onClick={() => onOpenProduct()}>
                <Text>Edit Product</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text>Delete Product</Text>
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
        titleHeader="Delete Product"
        titleBody="Are you sure? You can't undo this action afterwards."
        btnName=" Delete"
      />

      <ModalForm
        formBody={<ModalFormProduct onClose={onCloseProduct} handleEdit={onEdit} isEdit={true} id={id} />}
        onClose={onCloseProduct}
        isOpen={isOpenProduct}
        title={t("Update Product")}
      />
    </>
  );
};

export default ActionMenuProduct;
