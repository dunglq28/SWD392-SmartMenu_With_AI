import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import bg from "../../assets/images/bg.svg";
import avatar from "../../assets/images/avatar.svg";
import wave from "../../assets/images/wave.png";
import style from "./Login.module.scss";
import { IoMdPerson } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { login } from "../../services/AuthenticationService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.error(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
    }
  }, [location.state]);

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("AccessToken") !== null &&
      localStorage.getItem("RefreshToken") !== null;
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginHandler(); 
    }
  };

  const loginHandler = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }
    try {
      setIsLoading(true);
      const response = await login(credentials.username, credentials.password);
      
      if (response.statusCode === 200) {
        localStorage.setItem("AccessToken", response.data.token.accessToken);
        localStorage.setItem("RefreshToken", response.data.token.refreshToken);
        const toastMessage = response.message;
        navigate("/dashboard", { state: { toastMessage } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Flex className={style.Login}>
        <Flex className={style.LeftContainer}>
          <Image src={wave} className={style.Wave} />
          <Image src={bg} className={style.Bg} />
        </Flex>
        <Flex className={style.RightContainer}>
          <Flex className={style.FormContainer}>
            <Flex className={style.HeaderContainer}>
              <Image src={avatar} className={style.Avatar} />
              <Text className={style.WelcomeText}>CHÀO MỪNG</Text>
            </Flex>
            <Flex className={style.InputContainer}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <IoMdPerson />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Tên đăng nhập"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} 
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <RiLockPasswordLine />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} 
                  />
                  <InputRightElement className={style.ShowPasswordContainer}>
                    <Button
                      className={style.ShowPasswordButton}
                      onClick={handleShowClick}
                    >
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            <Button className={style.LoginButton} onClick={loginHandler}>
              ĐĂNG NHẬP
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
