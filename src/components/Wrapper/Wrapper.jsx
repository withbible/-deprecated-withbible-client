import React from "react";

//INTERNAL IMPORT
import Style from "./Wrapper.module.css";
import BottomBar from "../BottomBar/BottomBar";

const Wrapper = ({ children }) => {
  return (
    <>
      <div className={Style.bodyContainer}>
        {children}
      </div>
      
      <BottomBar />
    </>
  )
};

export default Wrapper;