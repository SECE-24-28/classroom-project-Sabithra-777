import React from "react";
import { PostionExampleStyle } from "./position-exmaple-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
const PositionExampleComponent = () => {
  return (
    <PostionExampleStyle>
      <div>
        <div className="box">
          <div className="box__content">
            <div className="circular__parent">
              <div className="circle">
                <FontAwesomeIcon icon={faBuildingColumns} color="aqua" />
              </div>
            </div>
            <div className="value">100</div>
            <div className="name">Colleges</div>
          </div>
          <div className="box__color"></div>
        </div>
      </div>
    </PostionExampleStyle>
  );
};
export default PositionExampleComponent;