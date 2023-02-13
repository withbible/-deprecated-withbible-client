import React from "react";
import { debounce } from "lodash";
import { Button, Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { useSnackbar } from "notistack";

// INTERNAL IMPORT
import Style from "./ButtonBox.module.css";
import { CLICK_INTERVAL_MILLISECOND } from "../../constants/config";

function EditButtonBox({ isFirst, isLast, setActiveStep, editQuiz }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios({
        method: "put",
        url: "/quiz",
        data: editQuiz,
      });

      enqueueSnackbar(data.message, { variant: "success" });
    } catch (error) {
      const { message } = error.response?.data || error;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Box className={Style.buttonBox}>
      <Button disabled={isFirst} onClick={handleBack}>
        <KeyboardArrowLeftIcon />
      </Button>

      <Button onClick={debounce(handleEdit, CLICK_INTERVAL_MILLISECOND)}>
        수정
      </Button>

      <Button
        className={`${isLast && Style.lastEditButton}`}
        onClick={handleNext}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  );
}

export default EditButtonBox;
