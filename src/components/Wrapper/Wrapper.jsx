import React from "react";

// INTERNAL IMPORT
import Style from "./Wrapper.module.css";
import BottomBar from "../BottomBar/BottomBar";

function Wrapper({ children }) {
  return (
    <div className={Style.pageContainer}>
      {children}
      <BottomBar />
    </div>
  );
}

Wrapper.Header = function Header({ children }) {
  return <div className={Style.headerContainer}>{children}</div>;
};

Wrapper.Body = function Body({ className, children }) {
  return (
    <div
      className={`
    ${Style.bodyContainer}
    ${className}
  `}
    >
      {children}
    </div>
  );
};

export default Wrapper;
