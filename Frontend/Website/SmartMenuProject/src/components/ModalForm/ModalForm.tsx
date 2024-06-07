import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./ModalForm.module.scss";
import { themeColors } from "../../constants/GlobalStyles";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  formBody: React.ReactNode;
  title: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, formBody, title }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay onClick={onClose} />
      <ModalContent borderRadius="23px" maxW="40%">
        <ModalHeader className={styles["modal-header"]} backgroundColor={themeColors.primaryButton}>
          {title}
          <Button
            bg="none"
            p={0}
            color="white"
            fontSize="25px"
            className={styles["close-button"]}
            onClick={onClose}
          >
            <IoMdCloseCircleOutline />
          </Button>
        </ModalHeader>
        {formBody}
        <ModalFooter>
          <Button backgroundColor={themeColors.primaryButton} color="white" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
