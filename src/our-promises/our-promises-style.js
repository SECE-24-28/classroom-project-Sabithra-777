import styled from "styled-components";
export const OurPromisesStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;

  h1 {
    text-align: center;
  }
  .parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    //background-color: pink;
  }
  .child {
    display: flex;
    max-width: 380px;
    gap: 20px;
    flex-direction: column;
    border-radius: 0px 0px 10px 10px;
    padding: 1.5rem;
    background-color: rgb(255, 255, 255);
  }
  .title__parent {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .para {
    font-weight: 400;
    font-size: 18px;
    color: rgb(86, 102, 131);
    text-align: left;
  }
  .title {
    font-size: 24px;
    color: rgb(119, 119, 119);
    font-weight: 600;
  }
`;