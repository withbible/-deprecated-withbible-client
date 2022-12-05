import React from "react";

//INTERNAL IMPORT
import Style from "./Wrapper.module.css";

const Wrapper = ({ children }) => {
  return (
    <div className={Style.pageContainer}>
      {children}
    </div>
  )
};

Wrapper.Header = ({ children }) => <div className={Style.headerContainer}>{children}</div>;

Wrapper.Body = ({ children }) => <div className={Style.bodyContainer}>{children}</div>;

export default Wrapper;