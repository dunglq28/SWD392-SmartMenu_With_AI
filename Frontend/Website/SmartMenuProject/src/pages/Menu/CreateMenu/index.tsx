import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tabs,
  TabPanel,
  TabPanels,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { FaPlus } from "react-icons/fa6";
import Draggable from "react-draggable";
import style from "./CreateMenu.module.scss";
import fakeMenu from "../../../assets/images/menu/menuImg.svg";
import Select from "react-select";
import template from "../../../assets/images/menu/smartMenu.svg";

function CreateMenu() {
  const {
    isOpen: isOpenCreateMenu,
    onOpen: onOpenCreateMenu,
    onClose: onCloseCreateMenu,
  } = useDisclosure();

  const [currentTab, setCurrentTab] = useState(0);
  const [IsDraggable, setIsDraggable] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      const { offsetWidth, offsetHeight } = imageRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleCaptureAndDownload = () => {
    const element = document.querySelector(".takeAPhoto") as HTMLElement;
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "capture.png";
        link.click();
      });
    }
  };

  const handleDraggable = () => {
    setIsDraggable(!IsDraggable);
  };

  const handleNextTab = () => {
    setCurrentTab((prevTab) => (prevTab < 2 ? prevTab + 1 : prevTab));
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => (prevTab > 0 ? prevTab - 1 : prevTab));
  };

  const handleReloadModal = () => {
    onCloseCreateMenu();
    setTimeout(onOpenCreateMenu, 100); // Đặt thời gian chờ ngắn để đảm bảo modal được đóng trước khi mở lại
  };

  const CustomerSegmentList = [
    { value: "1", label: "Khách hàng tiềm năng" },
    { value: "2", label: "Khách hàng mới" },
    { value: "3", label: "Khách hàng trung thành" },
    { value: "4", label: "Khách hàng VIP" },
    { value: "5", label: "Khách hàng doanh nghiệp" },
  ];

  return (
    <Flex className={style.Container}>
      <Text as="b" fontSize="30px">
        Vui lòng chọn mẫu thực đơn
      </Text>
      <Flex className={style.CardContainer}>
        <Flex className={style.Card} bg="#E3F2F1" onClick={onOpenCreateMenu}>
          <Image className={style.MenuImg} src={fakeMenu} />
        </Flex>
      </Flex>
      <Modal onClose={onCloseCreateMenu} size="full" isOpen={isOpenCreateMenu}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex columnGap="20px">
              <Text as="b" fontSize="30px">
                Tạo menu
              </Text>
              <Button onClick={handleDraggable}>
                IsDraggable: {IsDraggable.toString()}
              </Button>
              <Button onClick={handleReloadModal}>Reload modal</Button>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" justifyContent="center">
              <Tabs index={currentTab}>
                <TabPanels>
                  <TabPanel>
                    <Flex
                      width="100%"
                      justifyContent="center"
                      className="takeAPhoto"
                    >
                      <Flex
                        width={`${dimensions.width}px`}
                        height={`${dimensions.height}px`}
                        position="absolute"
                        zIndex={999}
                      >
                        <Flex
                          height="100%"
                          width="33.3333%"
                          flexDirection="column"
                        >
                          <Flex w="100%" height="50%" flexDirection="column">
                            <Draggable>
                              <Flex
                                height="20px"
                                marginTop="7px"
                                marginLeft="32%"
                              >
                                <Input
                                  contentEditable
                                  color="#7AD7F4"
                                  fontWeight="bold"
                                  variant="unstyled"
                                  placeholder="Menu Title"
                                  fontSize="1.05vw"
                                  w="100px"
                                  textAlign="center"
                                />
                              </Flex>
                            </Draggable>
                            <Draggable>
                              <Flex
                                border="1px solid black"
                                height="80%"
                                width="90%"
                                justifyContent="center"
                                alignItems="center"
                                marginTop="10px"
                                marginLeft="10px"
                                borderRadius="8px"
                              >
                                <FaPlus
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    color: "#444444",
                                  }}
                                />
                              </Flex>
                            </Draggable>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex w="60%" zIndex={-1}>
                        <Image ref={imageRef} src={template} />
                      </Flex>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex justifyContent="center" width="100%">
                      <Flex flexDirection="column" rowGap="20px" width="50%">
                        <Text as="b" fontSize="20px">
                          Phân khúc khách hàng
                        </Text>
                        <Select
                          options={CustomerSegmentList}
                          closeMenuOnSelect={true}
                        />
                      </Flex>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Text>three!</Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex columnGap="30px">
              <Button onClick={handlePreviousTab}>Previous</Button>
              <Button onClick={handleNextTab}>Next</Button>
              <Button onClick={handleCaptureAndDownload}>chụp ảnh</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CreateMenu;
