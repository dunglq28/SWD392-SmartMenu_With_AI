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

import style from "./ActionMenuCusSegment.module.scss";
import { useTranslation } from "react-i18next";
import CustomAlertDialog from "../../AlertDialog";
import ModalForm from "../../Modals/ModalForm/ModalForm";
import ModalFormCategory from "../../Modals/ModalFormCategory/ModalFormCategory";
import { customerSegmentUpdate } from "../../../payloads/requests/updateRequests.model";
import ModalFormCustomerSegment from "../../Modals/ModalFormCustomerSegment/ModalFormCusSegment";

interface ActionMenuProps {
  id: number;
  onDelete: (id: number) => void;
  onEdit: (brandId: number, segmentId: number, segment: customerSegmentUpdate) => void;
}

const ActionMenuCustomerSegment: FC<ActionMenuProps> = ({
  id,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCustomerSegment,
    onOpen: onOpenCustomerSegment,
    onClose: onCloseCustomerSegment,
  } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);

  return (
    <>
      <Flex className={style.SettingCustomerSegment}>
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
                onClick={() => onOpenCustomerSegment()}
              >
                <Text className={style.PopupButtonText}>
                  Edit Customer Segment
                </Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text className={style.PopupButtonText}>
                  Delete Customer Segment
                </Text>
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
        titleHeader="Delete Customer Segment"
        titleBody="Are you sure? You can't undo this action afterwards."
        btnName=" Delete"
      />

      <ModalForm
        formBody={
          <ModalFormCustomerSegment
            onClose={onCloseCustomerSegment}
            handleEdit={onEdit}
            isEdit={true}
            id={id}
          />
        }
        onClose={onCloseCustomerSegment}
        isOpen={isOpenCustomerSegment}
        title={t("Update Customer Segment")}
      />
    </>
  );
};

export default ActionMenuCustomerSegment;
