import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Style from "./page.module.css";
import { Wrapper } from "../components";
import Spinner from "../images/spinner.gif";

const NotFoundPage = ({
  title = "에러",
  message = "페이지가 존재하지 않습니다.",
}) => {
  return (
    <Wrapper>
      <Wrapper.Header>{title}</Wrapper.Header>
      <Wrapper.Body className={Style.container}>
        <img src={Spinner} alt="로딩중"/>
        <Typography variant="h4">{message}</Typography>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default NotFoundPage;
