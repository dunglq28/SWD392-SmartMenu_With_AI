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
import { RiSettings3Line } from "react-icons/ri";

import style from "./ActionMenu.module.scss";
import ModalForm from "../../Modals/ModalForm/ModalForm";
import ModalFormUser from "../../Modals/ModalFormUser/ModalFormUser";
import { useTranslation } from "react-i18next";
import { UserForm } from "../../../models/User.model";
import { getInitialUserData } from "../../../utils/initialUserData";
import { getUser } from "../../../services/UserService";
import { userUpdate } from "../../../payloads/requests/updateUser.model";

interface ActionMenuProps {
  id: number;
  onEdit: (id: number, user: userUpdate) => void;
  onDelete: (id: number) => void;
}

const ActionMenu: FC<ActionMenuProps> = ({ id, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: React.LegacyRef<HTMLButtonElement> = React.useRef(null);
  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
  } = useDisclosure();
  // USER DATA
  const [userData, setUserData] = useState<UserForm>(getInitialUserData());

  const handleEditClick = async () => {
    var result = await getUser(id);

    if (result.statusCode === 200) {
      const { fullname, userName, phone, dob, gender, isActive } = result.data;

      const updatedUserData: UserForm = {
        fullName: { value: fullname, errorMessage: "" },
        userName: { value: userName, errorMessage: "" },
        phoneNumber: { value: phone, errorMessage: "" },
        DOB: { value: new Date(dob), errorMessage: "" },
        gender: { value: gender, errorMessage: "" },
        isActive: { value: isActive ? 1 : 0, errorMessage: "" },
      };
      setUserData(updatedUserData);
      onOpenUser();
    }
  };

  const updateUserData = (user: UserForm, isSave: boolean) => {
    var userUpdate: userUpdate = {
      fullname: user.fullName.value,
      dob: user.DOB.value ? user.DOB.value.toISOString().split("T")[0] : "",
      gender: user.gender.value,
      phone: user.phoneNumber.value,
      isActive: Number(user.isActive.value) == 1 ? true : false,
      updateBy: Number(localStorage.getItem("UserId")),
    };
    onCloseUser();
    if (isSave) {
      onEdit(id, userUpdate);
    }
  };

  return (
    <>
      <Flex className={style.SettingUser}>
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
              <Flex className={style.PopupButton} onClick={handleEditClick}>
                <Text>Edit User</Text>
              </Flex>
              <Divider />
              <Flex className={style.PopupButton} onClick={onOpen}>
                <Text>Delete User</Text>
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
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {/* Pass the id parameter to the onDelete callback */}
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
          <ModalFormUser
            onClose={onCloseUser}
            userData={userData}
            isEdit={true}
            updateUserData={updateUserData}
          />
        }
        onClose={onCloseUser}
        isOpen={isOpenUser}
        title={t("Update user")}
      />
    </>
  );
};

export default ActionMenu;
