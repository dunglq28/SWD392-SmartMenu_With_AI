import React from "react";
import { Center, Spinner} from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Center position="fixed" top="0" left="0" right="0" bottom="0" bg="blackAlpha.300" zIndex="overlay">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>
    </Center>
  );
};

export default Loading;
