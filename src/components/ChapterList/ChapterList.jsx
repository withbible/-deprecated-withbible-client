import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

// INTERNAL IMPORT
import { findHistory } from "../../utils/util";
import Chapter from "./Chapter";

// HELPER FUNCTION
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

// MAIN
function ChapterList({ iteratee, histories, categorySeq }) {
  return (
    <ScrollMenu onWheel={onWheel}>
      {iteratee.map((each) => {
        const history = findHistory({
          iteratee: histories,
          key: "chapterNum",
          target: each,
        });

        return (
          <Chapter
            key={each}
            itemId={each}
            history={history}
            categorySeq={categorySeq}
          />
        );
      })}
    </ScrollMenu>
  );
}

export default ChapterList;
