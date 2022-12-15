import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Typography } from "@mui/material";

//INTERNAL IMPORT
import Chapter from "./Chapter";

const ChapterList = ({ iteratee, histories, title, categorySeq }) => {
  if (!histories) {
    return (
      <>
        <Typography>{title}</Typography>
        <ScrollMenu onWheel={onWheel}>
          {iteratee.map((each, index) => (
            <Chapter
              key={index}
              itemId={index}
              categorySeq={categorySeq}
              chapterNum={each}
            />
          ))}
        </ScrollMenu>
      </>
    );
  }

  return (
    <>
      {/* TODO: viewport 스크롤과 구분되는 것인가
       */}
      <Typography>{title}</Typography>
      <ScrollMenu onWheel={onWheel}>
        {iteratee.map((each, index) => {
          const isHistory = findHistory(histories, each);

          return (
            <Chapter
              key={index}
              itemId={index}
              isHistory={isHistory}
              categorySeq={categorySeq}
              chapterNum={each}
            />
          );
        })}
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

function findHistory(iteratee, target) {
  return iteratee.find((each) => each["chapter_num"] === target);
}
