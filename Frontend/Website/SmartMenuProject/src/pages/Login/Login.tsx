import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import bg from "../../assets/images/bg.svg";
import avatar from "../../assets/images/avatar.svg";
import wave from "../../assets/images/wave.png";
import style from "./Login.module.scss";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex className={style.Login}>
      <Flex className={style.LeftContainer}>
        <Image src={wave} className={style.Wave} />
        <Image src={bg} className={style.Bg} />
      </Flex>
      <Flex className={style.RightContainer}>
        <Flex className={style.FormContainer}>
          <Flex className={style.HeaderContainer}>
            <Image src={avatar} className={style.Avatar} />
            <Text className={style.WelcomeText}>WELCOME</Text>
          </Flex>
          <Flex className={style.InputContainer}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <TfiEmail />
                </InputLeftElement>
                <Input type="email" placeholder="email address" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <RiLockPasswordLine />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement className={style.ShowPasswordContainer}>
                  <Button
                    className={style.ShowPasswordButton}
                    onClick={handleShowClick}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText className={style.ForgotPasswordLink}>
                <Link>forgot password?</Link>
              </FormHelperText>
            </FormControl>
          </Flex>
          <Button className={style.LoginButton}>LOGIN</Button>
          <Box className={style.SignupPrompt}>
            Don't have account?{" "}
            <Link className={style.ContactLink} href="#">
              Contact us
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
