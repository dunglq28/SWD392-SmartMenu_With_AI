import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./Brand.module.scss";
import { Image } from "@chakra-ui/react";

function Brand() {
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
  }, [location.state, navigate]);

  return (
    <div className={style.container}>
      <div className={style.title}>All Brand</div>
      <div className={style.card}>
        <Image
          boxSize="100px"
          objectFit="cover"
          borderRadius="full"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
        <div className={style.wrapperText}>
          <div className={style.header}>Phúc Long</div>
          <div className={style.createDate}>
            Create on 2/8/2024 by Quang Dũng
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            style={{ color: "white", backgroundColor: "#0f172a" }}
            className={style.button}
          >
            View
          </button>
        </div>
      </div>
      <div className={style.card}>
        <Image
          boxSize="100px"
          objectFit="cover"
          borderRadius="full"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
        <div className={style.wrapperText}>
          <div className={style.header}>Katinat</div>
          <div className={style.createDate}>
            Create on 2/8/2024 by Quang Dũng
          </div>
        </div>
        <div className={style.btnContainer}>
          <button
            style={{ color: "white", backgroundColor: "#0f172a" }}
            className={style.button}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default Brand;
