import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Branch() {
  const location = useLocation();
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.success(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  return (
    <Flex>
      <Text>Branch</Text>
    </Flex>
  );
}

export default Branch;
