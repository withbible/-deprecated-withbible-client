import React from "react";
import { TextField, Typography } from "@mui/material";

// INTERNAL IMPORT
import Style from "./OptionList.module.css";

function EditOptionList({ iteratee, editQuiz, setEditQuiz }) {
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        질문선택지
      </Typography>

      {iteratee.map((each, index) => {
        return (
          <TextField
            className={Style.editOptionList}
            key={each.questionOptionSeq}
            value={each.questionOption}
            onChange={(event) =>
              setEditQuiz((prevState) => {
                const copied = { ...editQuiz };
                copied.optionArray[index].questionOption = event.target.value;

                return {
                  ...prevState,
                  ...copied,
                };
              })
            }
          />
        );
      })}
    </>
  );
}

export default EditOptionList;
