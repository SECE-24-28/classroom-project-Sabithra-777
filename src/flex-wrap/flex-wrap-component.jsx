import React from "react";
import { FlexStyle } from "../flex-box/flex-box-style";
import { FlexWrapStyle } from "./flex-wrap-style";
const FlexWrapComponent = () => {
  return (
    <FlexWrapStyle>
      <div className="parent">
        <div className="child_1"></div>
        <div className="child_2"></div>
        <div className="child_3"></div>
        <div className="child_4"></div>
        <div className="child_5"></div>
        <div className="child_6"></div>
      </div>
    </FlexWrapStyle>
  );
};
export default FlexWrapComponent;