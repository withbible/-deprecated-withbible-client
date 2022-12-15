import { Typography } from "@mui/material";

//INTERNAL IMPORT
import { Wrapper } from "../components";

const NotFoundPage = ({
  title = "에러",
  message = "페이지가 존재하지 않습니다.",
}) => {
  return (
    <Wrapper>
      <Wrapper.Header>{title}</Wrapper.Header>
      <Wrapper.Body>
        <Typography variant="h4">{message}</Typography>
      </Wrapper.Body>
    </Wrapper>
  );
};

export default NotFoundPage;
