import styled from "styled-components";
export const PostionExampleStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .box {
    //   position: absolute;
    position: relative;
    background-color: white;
    text-align: center;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    padding: 0.8rem;
    border-radius: 10px;
    z-index: 2;
  }
  .box__content {
    position: relative;
    padding: 1rem;
    text-align: center;
    background-color: pink;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 230px;
    height: 200px;
  }
  .box__color {
    border-radius: 10px;
    height: 50%;
    width: 100%;
    z-index: -1;
    left: 0px;
    right: 0px;
    position: absolute;
    top: initial;
    bottom: 0px;
    background-color: aqua;
  }
  .value {
    font-size: 40px;
    font-weight: 700;
    color: gray;
  }
  .name {
    font-size: 20px;
    font-weight: 500;
    color: gray;
  }
  .circular__parent {
    position: absolute;
    left: 50%;
    top: 0;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    translate: -50% -50%;
  }
  .circle {
    width: 70px;
    height: 70px;
    padding: 0.4rem;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;