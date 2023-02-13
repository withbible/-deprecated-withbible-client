import React from "react";
import { TextField } from "@mui/material";

// INTERNAL IMPORT
import Style from "./QuestionBox.module.css";

function EditQuestionBox({ question, questionSub, setEditQuiz }) {
  return (
    <>
      <TextField
        className={Style.editQuestion}
        label="질문"
        value={question}
        onChange={(event) =>
          setEditQuiz((prevState) => {
            return { ...prevState, question: event.target.value };
          })
        }
      />

      {questionSub && (
        <TextField
          className={Style.editQuestion}
          label="보조질문"
          value={questionSub}
          onChange={(event) =>
            setEditQuiz((prevState) => {
              return { ...prevState, questionSub: event.target.value };
            })
          }
        />
      )}
    </>
  );
}

export default EditQuestionBox;
