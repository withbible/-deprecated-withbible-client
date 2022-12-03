import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

//INTERNAL IMPORT
import Chapter from "./Chapter";

function ChapterList({ iteratee, title }) {
  return (
    <>
      {/* TODO: ScrollMenu Header not working */}
      {title}
      <ScrollMenu onWheel={onWheel}>
        {iteratee.map((each, index) => (
          <Chapter key={index} itemId={index} chapterSeq={each} />
        ))}
      </ScrollMenu>
    </>
  );
}

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
