import React from "react";

//INTERNAL IMPORT
import Style from "./Wrapper.module.css";
import BottomBar from "../BottomBar/BottomBar";

const Wrapper = ({ children }) => {
  return (
    <div className={Style.pageContainer}>
      {children}
      <BottomBar />
    </div>
  );
};

Wrapper.Header = ({ children }) => (
  <div className={Style.headerContainer}>{children}</div>
);

Wrapper.Body = ({ children }) => (
  <div className={Style.bodyContainer}>{children}</div>
);

export default Wrapper;
