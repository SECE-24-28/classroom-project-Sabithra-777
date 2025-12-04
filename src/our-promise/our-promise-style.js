import styled from "styled-components";

export const PromiseWrapper = styled.div`
  padding: 50px 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p.subtitle {
    font-size: 18px;
    color: #555;
    margin-bottom: 50px;
  }
`;

export const PromiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PromiseCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: left;

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-top: 10px;
  }

  p {
    color: #666;
    margin-top: 5px;
    line-height: 1.6;
  }

  .icon {
    font-size: 40px;
    margin-bottom: 10px;
  }

  /* underline bar */
  .underline {
    height: 4px;
    width: 100%;
    margin-top: 20px;
  }
`;
