import {
  Button,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import bg from "../../assets/images/bg.svg";
import avatar from "../../assets/images/avatar.svg";
import wave from "../../assets/images/wave.png";
import style from "./Login.module.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex className={style.Login}>
      <Flex w="40%">
        <Image src={wave} className={style.Wave} />
        <Image src={bg} className={style.Bg} />
      </Flex>
      <Flex width="60%" justifyContent="center" alignItems="center">
        <Flex flexDir="column" w="40%" rowGap="10px">
          <Flex justifyContent="center" alignItems="center" flexDir="column">
            <Image src={avatar} className={style.Avatar} />
            <Text fontSize="50px" as="b">
              WELCOME
            </Text>
          </Flex>
          <Flex flexDir="column" rowGap="10px">
            <Text color="#ccc" as="b">
              Username
            </Text>

            <InputGroup w="119%">
              <FaUser
                style={{ height: "20px", width: "20px", marginRight: "4px" }}
              />
              <Input pr="4.5rem" variant="unstyled" />
            </InputGroup>
            <Divider />

            <Text color="#ccc" as="b">
              Password
            </Text>

            <InputGroup w="8    0%">
              <FaLock
                style={{ height: "20px", width: "20px", marginRight: "4px" }}
              />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                variant="unstyled"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  marginBottom="15px"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Divider />
          </Flex>
          <Flex justifyContent="flex-end">
            <Text fontSize="13px" color="#ccc">
              Don't have account? Contact us
            </Text>
          </Flex>
          <Button bg="#b9d7d5">LOGIN</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
