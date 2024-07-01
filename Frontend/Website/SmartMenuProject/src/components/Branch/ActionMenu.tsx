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

import style from "./ActionMenu.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ModalForm from "../Modals/ModalForm/ModalForm";
import CustomAlertDialog from "../AlertDialog";
import { branchUpdate } from "../../payloads/requests/updateBranch.model";
import { BranchForm } from "../../models/BranchForm.model";
import ModalFormBranch from "../Modals/ModalFormBranch/ModalFormBranch";
import { RiSettings3Line } from "react-icons/ri";
import { getBranch } from "../../services/BranchService";

interface ActionMenuProps {
  id: number;
  brandName: string;
  onDelete: (id: number) => void;
  onEdit: (branch: branchUpdate) => void;
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
    onOpen: onOpenBranch,
    onClose: onCloseBranch,
  } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);
  //BRANCH DATA
  const [branchData, setBranchData] = useState<BranchForm>({
    brandName: {
      id: "",
      value: "",
      errorMessage: "",
    },
    city: {
      id: "",
      name: "",
      errorMessage: "",
    },
    district: {
      id: "",
      name: "",
      errorMessage: "",
    },
    ward: {
      id: "",
      name: "",
      errorMessage: "",
    },
    address: {
      value: "",
      errorMessage: "",
    },
  });

  const updateBranchData = (branch: BranchForm, isSave: boolean) => {
    var branchUpdate: branchUpdate = {
      id: id,
      city: branch.city.name,
      district: branch.district.name,
      ward: branch.ward.name,
      address: branch.address.value,
      isActive: true
    };
    onCloseBranch();
    if (isSave) {
      onEdit(branchUpdate);
    }
  };

  const handleEditClick = async () => {
    var result = await getBranch(id);
    if (result.statusCode === 200) {
      const { storeId, brandId, address, city } = result.data;

      const wardIndex = address.indexOf("Phường");
      const districtIndex = address.indexOf("Quận");
      const streetNumberAndName =
        wardIndex !== -1 ? address.substring(0, wardIndex).trim() : address;
      const ward =
        wardIndex !== -1
          ? address.substring(wardIndex + 6, districtIndex).trim()
          : "";
      const district =
        districtIndex !== -1 ? address.substring(districtIndex + 5).trim() : "";

      const updatedBranchData: BranchForm = {
        brandName: {
          id: brandId.toString(),
          value: brandName,
          errorMessage: "",
        },
        city: { id: "", name: city, errorMessage: "" },
        ward: { id: "", name: ward.replace(/,$/, ""), errorMessage: "" },
        district: { id: "", name: district, errorMessage: "" },
        address: {
          value: streetNumberAndName.replace(/,$/, ""),
          errorMessage: "",
        },
      };
      setBranchData(updatedBranchData);
      onOpenBranch();
    }
  };

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
              <Flex className={style.PopupButton} onClick={handleEditClick}>
                <Text>Edit Branch</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text>Delete Branch</Text>
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
        titleHeader="Delete Branch"
        titleBody="Are you sure? You can't undo this action afterwards."
        btnName=" Delete"
      />

      <ModalForm
        formBody={
          <ModalFormBranch
            branchData={branchData}
            onClose={onCloseBranch}
            isEdit={true}
            updateBranchData={updateBranchData}
          />
        }
        onClose={onCloseBranch}
        isOpen={isOpenBrand}
        title={t("Update Brand")}
        updateBranchData={updateBranchData}
      />
    </>
  );
};

export default ActionMenu;
