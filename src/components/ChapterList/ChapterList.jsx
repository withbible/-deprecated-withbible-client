import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Chapter from "./Chapter";

const ChapterList = ({ iteratee, histories, title, categorySeq }) => {
  return (
    <>
      {/* TODO: viewport 스크롤과 구분되는 것인가
       */}
      <Typography>{title}</Typography>
      <ScrollMenu onWheel={onWheel}>
        {iteratee.map((each, index) =>
          histories ? (
            <Chapter
              key={index}
              itemId={index}
              isHistory={histories[index]}
              categorySeq={categorySeq}
              chapterNum={each}
            />
          ) : (
            <Chapter
              key={index}
              itemId={index}
              categorySeq={categorySeq}
              chapterNum={each}
            />
          )
        )}
      </ScrollMenu>
    </>
  );
};

export default ChapterList;

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
