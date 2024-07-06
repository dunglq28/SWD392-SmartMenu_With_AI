import React, { useState } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tabs,
  TabPanel,
  TabPanels,
  Input,
  ModalBody,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import Draggable from "react-draggable";
import Select from "react-select";
import template from "../../../assets/images/menu/CreateMenu/menuTemplate1.svg";
import { ProductData } from "../../../payloads/responses/ProductData.model";
import style from "./ModalFormCreateMenu.module.scss";
import freezeTraXanh from "../../../assets/images/menu/CreateMenu/FREEZE-TRA-XANH.png";
import component1 from "../../../assets/images/menu/CreateMenu/Component1.svg";
import component2 from "../../../assets/images/menu/CreateMenu/Component2.svg";
import { AiOutlineGlobal } from "react-icons/ai";

import { MdPhoneInTalk } from "react-icons/md";
import html2canvas from "html2canvas";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenListProduct: (Index: number) => void;
  selectedProducts1: ProductData[];
  selectedProducts2: ProductData[];
  selectedProducts3: ProductData[];
  selectedProducts4: ProductData[];
}

const ModalFormCreateMenu: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenListProduct,
  selectedProducts1,
  selectedProducts2,
  selectedProducts3,
  selectedProducts4,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [IsDraggable, setIsDraggable] = React.useState(false);
  const [isBorder, setIsBorder] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({ width: 5, height: 5 });
  const imageRef = React.useRef<HTMLImageElement>(null);
  const {
    isOpen: isOpenAlertCancelForm,
    onOpen: onOpenAlertCancelForm,
    onClose: onCloseAlertCancelForm,
  } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        setDimensions({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setDimensions({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    }
  };

  const handleDraggable = () => {
    setIsDraggable(!IsDraggable);
  };
  const handleBorder = () => {
    setIsBorder(!isBorder);
  };

  const handleNextTab = () => {
    handleCaptureAndDisplay();
    setCurrentTab((prevTab) => (prevTab < 2 ? prevTab + 1 : prevTab));
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => (prevTab > 0 ? 0 : prevTab));
  };

  const CustomerSegmentList = [
    { value: "1", label: "Khách hàng tiềm năng" },
    { value: "2", label: "Khách hàng mới" },
    { value: "3", label: "Khách hàng trung thành" },
    { value: "4", label: "Khách hàng VIP" },
    { value: "5", label: "Khách hàng doanh nghiệp" },
  ];

  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    undefined
  );

  const handleCaptureAndDisplay = () => {
    const element = document.querySelector(".takeAPhoto") as HTMLElement;
    if (element) {
      html2canvas(element, { scale: 2 })
        .then((canvas) => {
          const imageDataURL = canvas.toDataURL("image/png");
          setCapturedImage(imageDataURL);
        })
        .catch((error) => {
          console.error("Failed to capture image:", error);
          setCapturedImage(undefined); // or handle error state accordingly
        });
    }
  };

  const handleCloseForm = () => {
    onCloseAlertCancelForm();
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>
            {currentTab === 0 ? (
              <Flex columnGap="20px">
                <Text as="b" fontSize="30px">
                  Tạo menu
                </Text>
                <Button onClick={handleDraggable}>
                  Draggable: {(!IsDraggable).toString()}
                </Button>
                <Button onClick={handleBorder}>
                  Border: {(!isBorder).toString()}
                </Button>
              </Flex>
            ) : currentTab === 1 ? (
              <Text as="b" fontSize="30px">
                Xem lại menu đã tạo
              </Text>
            ) : (
              <Text as="b" fontSize="30px">
                Thông tin menu
              </Text>
            )}
          </ModalHeader>
          <ModalBody>
            <Tabs index={currentTab}>
              <TabPanels>
                <TabPanel>
                  <Flex
                    width="100%"
                    justifyContent="center"
                    className="takeAPhoto"
                    userSelect="none"
                  >
                    <Flex
                      width={`${dimensions.width}px`}
                      height={`${dimensions.height}px`}
                      position="absolute"
                    >
                      <Flex
                        height="100%"
                        width="33.3333%"
                        flexDirection="column"
                      >
                        {/* List 1 */}
                        <Flex w="100%" height="48%" flexDirection="column">
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              height="20px"
                              marginTop="7px"
                              marginLeft="35%"
                            >
                              <Text
                                border={
                                  isBorder
                                    ? "1px solid black"
                                    : "1px solid transparent"
                                }
                                contentEditable
                                spellCheck={false}
                                color="#7AD7F4"
                                fontSize="1.05vw"
                                w="5.1vw"
                                height="1.5vw"
                                whiteSpace="nowrap"
                                fontWeight="bold"
                                textAlign="center"
                              >
                                Menu Title
                              </Text>
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="80%"
                              width="90%"
                              justifyContent="space-between"
                              alignItems="center"
                              marginTop="10px"
                              marginLeft="10px"
                              borderRadius="8px"
                              flexDirection="column"
                            >
                              {selectedProducts1.length !== 0 &&
                                selectedProducts1.map((product) => (
                                  <Flex
                                    key={product.productId}
                                    height="23%"
                                    width="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                    cursor="pointer"
                                    onClick={
                                      selectedProducts1.length === 4
                                        ? () => onOpenListProduct(1)
                                        : () => {}
                                    }
                                  >
                                    <Flex
                                      width="30%"
                                      height="100%"
                                      justifyContent="center"
                                    >
                                      <Image src={freezeTraXanh} />
                                    </Flex>
                                    <Flex
                                      width="70%"
                                      height="100%"
                                      flexDirection="column"
                                      justifyContent="center"
                                    >
                                      <Flex
                                        justifyContent="space-between"
                                        textOverflow="ellipsis"
                                      >
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.productName}
                                        </Text>
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.price}
                                        </Text>
                                      </Flex>
                                      <Text fontSize="0.6vw" color="#5A3D41">
                                        {product.description}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                ))}
                              {selectedProducts1.length !== 4 && (
                                <FaPlus
                                  onClick={() => onOpenListProduct(1)}
                                  style={{
                                    height: "4vw",
                                    width: "4vw",
                                    color: "#444444",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </Flex>
                          </Draggable>
                        </Flex>
                        {/* End List 1 */}
                        {/* List 2 */}
                        <Flex w="100%" height="52%" flexDirection="column">
                          <Draggable disabled={IsDraggable}>
                            <Flex height="20px" marginLeft="36%">
                              <Text
                                border={
                                  isBorder
                                    ? "1px solid black"
                                    : "1px solid transparent"
                                }
                                contentEditable
                                spellCheck={false}
                                color="#7AD7F4"
                                fontSize="1.05vw"
                                w="5.1vw"
                                height="1.5vw"
                                whiteSpace="nowrap"
                                fontWeight="bold"
                                textAlign="center"
                              >
                                Menu Title
                              </Text>
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="70%"
                              width="90%"
                              justifyContent="space-between"
                              alignItems="center"
                              marginTop="10px"
                              marginLeft="10px"
                              borderRadius="8px"
                              flexWrap="wrap"
                            >
                              {selectedProducts2.length !== 0 &&
                                selectedProducts2.map((product) => (
                                  <Flex
                                    key={product.productId}
                                    height="43%"
                                    width="47%"
                                    flexDirection="column"
                                    cursor="pointer"
                                    onClick={
                                      selectedProducts2.length === 4
                                        ? () => onOpenListProduct(2)
                                        : () => {}
                                    }
                                  >
                                    <Flex height="50%" w="50%">
                                      <Image src={freezeTraXanh} />
                                    </Flex>
                                    <Flex
                                      height="50%"
                                      w="100%"
                                      flexDirection="column"
                                    >
                                      <Flex
                                        height="50%"
                                        w="100%"
                                        justifyContent="space-between"
                                      >
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.productName}
                                        </Text>
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.price}
                                        </Text>
                                      </Flex>
                                      <Text fontSize="0.6vw" color="#5A3D41">
                                        {product.description}
                                        {product.description}
                                        {product.description}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                ))}
                              {selectedProducts2.length !== 4 && (
                                <FaPlus
                                  onClick={() => onOpenListProduct(2)}
                                  style={{
                                    height: "4vw",
                                    width: "4vw",
                                    color: "#444444",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </Flex>
                          </Draggable>
                        </Flex>
                        {/* End List 2 */}
                      </Flex>
                      <Flex
                        height="100%"
                        width="33.3333%"
                        flexDirection="column"
                        paddingTop="8px"
                      >
                        {/* List 3 */}
                        <Flex w="100%" height="47%" flexDirection="column">
                          <Draggable disabled={IsDraggable}>
                            <Flex height="20px" marginLeft="36%">
                              <Text
                                border={
                                  isBorder
                                    ? "1px solid black"
                                    : "1px solid transparent"
                                }
                                contentEditable
                                spellCheck={false}
                                color="#7AD7F4"
                                fontSize="1.05vw"
                                w="5.1vw"
                                height="1.5vw"
                                whiteSpace="nowrap"
                                fontWeight="bold"
                                textAlign="center"
                              >
                                Menu Title
                              </Text>
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="70%"
                              width="90%"
                              justifyContent="space-between"
                              alignItems="center"
                              marginTop="10px"
                              marginLeft="10px"
                              borderRadius="8px"
                              flexWrap="wrap"
                            >
                              {selectedProducts3.length !== 0 &&
                                selectedProducts3.map((product) => (
                                  <Flex
                                    key={product.productId}
                                    height="43%"
                                    width="47%"
                                    flexDirection="column"
                                    cursor="pointer"
                                    onClick={
                                      selectedProducts3.length === 4
                                        ? () => onOpenListProduct(3)
                                        : () => {}
                                    }
                                  >
                                    <Flex height="50%" w="50%">
                                      <Image src={freezeTraXanh} />
                                    </Flex>
                                    <Flex
                                      height="50%"
                                      w="100%"
                                      flexDirection="column"
                                    >
                                      <Flex
                                        height="50%"
                                        w="100%"
                                        justifyContent="space-between"
                                      >
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.productName}
                                        </Text>
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.price}
                                        </Text>
                                      </Flex>
                                      <Text fontSize="0.6vw" color="#5A3D41">
                                        {product.description}
                                        {product.description}
                                        {product.description}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                ))}
                              {selectedProducts3.length !== 4 && (
                                <FaPlus
                                  onClick={() => onOpenListProduct(3)}
                                  style={{
                                    height: "4vw",
                                    width: "4vw",
                                    color: "#444444",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </Flex>
                          </Draggable>
                        </Flex>
                        {/* End List 3 */}
                        {/* List 4 */}
                        <Flex w="100%" height="50%" flexDirection="column">
                          <Draggable disabled={IsDraggable}>
                            <Flex height="20px" marginLeft="36%">
                              <Text
                                border={
                                  isBorder
                                    ? "1px solid black"
                                    : "1px solid transparent"
                                }
                                contentEditable
                                spellCheck={false}
                                color="#7AD7F4"
                                fontSize="1.05vw"
                                w="5.1vw"
                                height="1.5vw"
                                whiteSpace="nowrap"
                                fontWeight="bold"
                                textAlign="center"
                              >
                                Menu Title
                              </Text>
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="50%"
                              width="90%"
                              justifyContent="space-between"
                              alignItems="center"
                              marginLeft="10px"
                              borderRadius="8px"
                              flexWrap="wrap"
                            >
                              {selectedProducts4.length !== 0 &&
                                selectedProducts4.map((product) => (
                                  <Flex
                                    key={product.productId}
                                    height="53%"
                                    width="47%"
                                    flexDirection="column"
                                    cursor="pointer"
                                    onClick={
                                      selectedProducts4.length === 2
                                        ? () => onOpenListProduct(4)
                                        : () => {}
                                    }
                                  >
                                    <Flex height="50%" w="50%">
                                      <Image src={freezeTraXanh} />
                                    </Flex>
                                    <Flex
                                      height="50%"
                                      w="100%"
                                      flexDirection="column"
                                    >
                                      <Flex
                                        height="50%"
                                        w="100%"
                                        justifyContent="space-between"
                                      >
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.productName}
                                        </Text>
                                        <Text
                                          fontWeight="bold"
                                          fontSize="0.8vw"
                                          color="#5A3D41"
                                        >
                                          {product.price}
                                        </Text>
                                      </Flex>
                                      <Text fontSize="0.6vw" color="#5A3D41">
                                        {product.description}
                                        {product.description}
                                        {product.description}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                ))}
                              {selectedProducts4.length !== 2 && (
                                <FaPlus
                                  onClick={() => onOpenListProduct(4)}
                                  style={{
                                    height: "4vw",
                                    width: "4vw",
                                    color: "#444444",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex
                              w="100%"
                              height="25%"
                              alignItems="center"
                              justifyContent="center"
                              flexDirection="column"
                              marginLeft="0.5vw"
                            >
                              <Text
                                fontSize="0.7vw"
                                fontWeight="bold"
                                color="#7AD7F4"
                                marginTop="1.8vw"
                              >
                                ĐỊA CHỈ
                              </Text>
                              <Text
                                fontSize="0.7vw"
                                fontWeight="bold"
                                color="#5A3D41"
                                contentEditable
                                spellCheck={false}
                              >
                                YOUR ADDRESS HERE IN THIS LINE
                              </Text>
                              <Text
                                fontSize="0.7vw"
                                fontWeight="bold"
                                color="#5A3D41"
                                contentEditable
                                spellCheck={false}
                                userSelect="auto"
                              >
                                www.example.com
                              </Text>
                            </Flex>
                          </Draggable>
                          <Draggable disabled={IsDraggable}>
                            <Flex w="100%" height="25%" flexDirection="column">
                              <Flex
                                height="50%"
                                width="100%"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Text
                                  fontSize="0.55vw"
                                  fontWeight="bold"
                                  color="#7AD7F4"
                                  marginLeft="1vw"
                                >
                                  GIAO HÀNG
                                </Text>
                              </Flex>
                              <Flex
                                height="50%"
                                width="100%"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <MdPhoneInTalk
                                  style={{
                                    height: "1.5vw",
                                    width: "1.5vw",
                                    marginTop: "0.3vw",
                                  }}
                                />
                                <Text
                                  fontSize="1.4vw"
                                  fontWeight="bold"
                                  color="#5A3D41"
                                  contentEditable
                                  spellCheck={false}
                                >
                                  0123456789
                                </Text>
                              </Flex>
                            </Flex>
                          </Draggable>
                        </Flex>
                        {/* End List 4 */}
                      </Flex>
                      {/* Spotlight */}
                      <Flex
                        height="100%"
                        width="33.3333%"
                        flexDirection="column"
                        // paddingTop="8px"
                      >
                        <Flex
                          height="37.5%"
                          width="100%"
                          flexDirection="column"
                        >
                          <Flex height="50%" width="100%"></Flex>
                          <Flex
                            height="50%"
                            width="100%"
                            justifyContent="space-between"
                          >
                            <Draggable disabled={IsDraggable}>
                              <Flex>
                                <Image
                                  src={component1}
                                  height="3.3vw"
                                  style={{ pointerEvents: "none" }}
                                />
                              </Flex>
                            </Draggable>
                            <Flex
                              marginTop="-1vw"
                              marginLeft="-1.4vw"
                              height="100%"
                              w="70%"
                              transform="rotate(-7deg)"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Draggable disabled={IsDraggable}>
                                <Text
                                  className={style.SpotligtTitle}
                                  textAlign="center"
                                  contentEditable
                                  spellCheck={false}
                                >
                                  Cà Phê Late
                                </Text>
                              </Draggable>
                            </Flex>
                            <Draggable disabled={IsDraggable}>
                              <Flex>
                                <Image
                                  src={component2}
                                  height="3.2vw"
                                  marginTop="1vw"
                                  style={{ pointerEvents: "none" }}
                                />
                              </Flex>
                            </Draggable>
                          </Flex>
                        </Flex>
                        <Flex
                          height="62.5%"
                          width="100%"
                          flexDirection="column"
                        >
                          <Flex
                            height="50%"
                            width="100%"
                            justifyContent="center"
                          >
                            <Flex
                              w="55%"
                              height="94%"
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              borderRadius="50%"
                              justifyContent="center"
                              alignItems="center"
                              bg="#fff"
                            >
                              {/* <FaPlus
                                style={{
                                  height: "4vw",
                                  width: "4vw",
                                  color: "#444444",
                                  cursor: "pointer",
                                }}
                              /> */}
                            </Flex>
                          </Flex>
                          <Flex
                            height="50%"
                            width="100%"
                            flexDirection="column"
                            alignItems="center"
                            rowGap="10px"
                          >
                            <Draggable disabled={IsDraggable}>
                              <Flex
                                height="20%"
                                width="40%"
                                marginTop="3vw"
                                bg="#444444"
                                alignItems="center"
                                justifyContent="space-around"
                              >
                                <Flex
                                  width="41%"
                                  height="90%"
                                  justifyContent="center"
                                  flexDirection="column"
                                >
                                  <Text fontSize="0.5vw" color="#fff">
                                    DOOR OPEN
                                  </Text>
                                  <Text
                                    fontSize="1vw"
                                    color="#7DD7F3"
                                    fontWeight="bold"
                                    contentEditable
                                    spellCheck={false}
                                    textAlign="center"
                                  >
                                    08 AM
                                  </Text>
                                </Flex>
                                <Flex
                                  width="41%"
                                  height="90%"
                                  justifyContent="center"
                                  flexDirection="column"
                                >
                                  <Text fontSize="0.5vw" color="#fff">
                                    DOOR CLOSE
                                  </Text>
                                  <Text
                                    fontSize="1vw"
                                    color="#7DD7F3"
                                    fontWeight="bold"
                                    contentEditable
                                    spellCheck={false}
                                    textAlign="center"
                                  >
                                    09 PM
                                  </Text>
                                </Flex>
                              </Flex>
                            </Draggable>
                            <Draggable disabled={IsDraggable}>
                              <Text
                                fontSize="0.9vw"
                                fontWeight="bold"
                                color="#5A3D41"
                                contentEditable
                                spellCheck={false}
                              >
                                ORDER NOW
                              </Text>
                            </Draggable>
                            <Draggable disabled={IsDraggable}>
                              <Text
                                fontSize="0.6vw"
                                fontWeight="bold"
                                color="#5A3D41"
                                contentEditable
                                spellCheck={false}
                                textAlign="center"
                                width="70%"
                              >
                                Your detail address here in this line
                              </Text>
                            </Draggable>
                            <Draggable disabled={IsDraggable}>
                              <Flex justifyContent="space-between" width="100%">
                                <Flex
                                  height="50%"
                                  width="100%"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <MdPhoneInTalk
                                    style={{
                                      height: "1vw",
                                      width: "1vw",
                                      marginTop: "0.2vw",
                                    }}
                                  />
                                  <Text
                                    fontSize="1vw"
                                    fontWeight="bold"
                                    color="#5A3D41"
                                    contentEditable
                                    spellCheck={false}
                                  >
                                    0123456789
                                  </Text>
                                </Flex>
                                <Flex
                                  height="50%"
                                  width="100%"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <AiOutlineGlobal
                                    style={{
                                      height: "1vw",
                                      width: "1vw",
                                      marginTop: "0.2vw",
                                    }}
                                  />
                                  <Text
                                    fontSize="0.8vw"
                                    fontWeight="bold"
                                    color="#5A3D41"
                                    contentEditable
                                    spellCheck={false}
                                  >
                                    www.example.com
                                  </Text>
                                </Flex>
                              </Flex>
                            </Draggable>
                          </Flex>
                        </Flex>
                      </Flex>
                      {/* End Spotlight */}
                    </Flex>

                    {/* Menu img */}
                    <Flex w="60%" zIndex={-1}>
                      <Image
                        ref={imageRef}
                        src={template}
                        onLoad={handleImageLoad}
                      />
                    </Flex>
                    {/* End Menu img */}

                    {/* Background of menu */}
                    <Flex
                      width={`${dimensions.width}px`}
                      height={`${dimensions.height}px`}
                      position="absolute"
                      bg="#B8D7D5"
                      zIndex={-2}
                    ></Flex>
                    {/* End Background of menu */}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Image src={capturedImage} alt="enter" />
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
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex columnGap="30px" zIndex={100}>
              <Button onClick={onOpenAlertCancelForm} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={handlePreviousTab}>Back</Button>
              <Button onClick={handleNextTab}>Next</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenAlertCancelForm}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlertCancelForm}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hủy tạo menu
            </AlertDialogHeader>

            <AlertDialogBody>
              Menu đang tạo sẽ không thể phục hồi sau khi bị hủy, bạn có chắc
              chắn muốn hủy ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlertCancelForm}>
                Không
              </Button>
              <Button colorScheme="red" onClick={handleCloseForm} ml={3}>
                Hủy
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ModalFormCreateMenu;
