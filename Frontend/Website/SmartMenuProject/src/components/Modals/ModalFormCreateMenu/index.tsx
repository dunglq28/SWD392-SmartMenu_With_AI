import React from "react";
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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import Draggable from "react-draggable";
import Select from "react-select";
import template from "../../../assets/images/menu/smartMenu.svg";
import { ProductData } from "../../../payloads/responses/ProductData.model";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenListProduct: (Index: number) => void;
  selectedProducts1: ProductData[];
  selectedProducts2: ProductData[];
}

const ModalFormCreateMenu: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenListProduct,
  selectedProducts1,
  selectedProducts2,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [IsDraggable, setIsDraggable] = React.useState(false);
  const [isBorder, setIsBorder] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({ width: 5, height: 5 });
  const imageRef = React.useRef<HTMLImageElement>(null);

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
    setCurrentTab((prevTab) => (prevTab < 2 ? prevTab + 1 : prevTab));
  };

  const handlePreviousTab = () => {
    setCurrentTab((prevTab) => (prevTab > 0 ? prevTab - 1 : prevTab));
  };

  const CustomerSegmentList = [
    { value: "1", label: "Khách hàng tiềm năng" },
    { value: "2", label: "Khách hàng mới" },
    { value: "3", label: "Khách hàng trung thành" },
    { value: "4", label: "Khách hàng VIP" },
    { value: "5", label: "Khách hàng doanh nghiệp" },
  ];

  const handleCaptureAndDownload = () => {
    const element = document.querySelector(".takeAPhoto") as HTMLElement;
    if (element) {
      import("html2canvas").then((html2canvas) => {
        html2canvas.default(element, { scale: 2 }).then((canvas: any) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "capture.png";
          link.click();
        });
      });
    }
  };

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
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
        </ModalHeader>
        <ModalBody>
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
                  >
                    <Flex height="100%" width="33.3333%" flexDirection="column">
                      {/* List 1 */}
                      <Flex w="100%" height="48%" flexDirection="column">
                        <Draggable disabled={IsDraggable}>
                          <Flex height="20px" marginTop="7px" marginLeft="35%">
                            <Input
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="1.5vw"
                              color="#7AD7F4"
                              fontWeight="bold"
                              variant="unstyled"
                              placeholder="Menu Title"
                              fontSize="1.05vw"
                              w="5vw"
                              textAlign="center"
                            />
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
                                  height="20%"
                                  width="100%"
                                  bg="red"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Text>{product.productName}</Text>
                                </Flex>
                              ))}
                            {selectedProducts1.length !== 4 && (
                              <FaPlus
                                onClick={() => onOpenListProduct(1)}
                                style={{
                                  height: "4vw",
                                  width: "4vw",
                                  color: "#444444",
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
                            <Input
                              border={
                                isBorder
                                  ? "1px solid black"
                                  : "1px solid transparent"
                              }
                              height="1.5vw"
                              color="#7AD7F4"
                              fontWeight="bold"
                              variant="unstyled"
                              placeholder="Menu Title"
                              fontSize="1.05vw"
                              w="5vw"
                              textAlign="center"
                            />
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
                            {selectedProducts2.length !== 0 &&
                              selectedProducts2.map((product) => (
                                <Flex
                                  key={product.productId}
                                  height="20%"
                                  width="100%"
                                  bg="red"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Text>{product.productName}</Text>
                                </Flex>
                              ))}
                            {selectedProducts2.length !== 4 && (
                              <FaPlus
                                onClick={() => onOpenListProduct(2)}
                                style={{
                                  height: "4vw",
                                  width: "4vw",
                                  color: "#444444",
                                }}
                              />
                            )}
                          </Flex>
                        </Draggable>
                      </Flex>
                      {/* End List 2 */}
                    </Flex>
                  </Flex>
                  <Flex w="60%" zIndex={-1}>
                    <Image
                      ref={imageRef}
                      src={template}
                      onLoad={handleImageLoad}
                    />
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
        </ModalBody>
        <ModalFooter>
          <Flex columnGap="30px" zIndex={100}>
            <Button onClick={handlePreviousTab}>Previous</Button>
            <Button onClick={handleNextTab}>Next</Button>
            <Button onClick={handleCaptureAndDownload}>chụp ảnh</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalFormCreateMenu;
