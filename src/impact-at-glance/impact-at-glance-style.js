import styled from "styled-components";

export const GlanceWrapper = styled.div`
  padding: 60px 20px;
  text-align: center;
  font-family: "Inter", sans-serif;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  span.red {
    color: #ff3b47;
  }
`;

export const GlanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: auto;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

export const GlanceCard = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  padding: 1.2rem 1rem 0px;
  background-color: ${(props) => props.bg};
  border-radius: 12px;
  overflow: visible;
  font-family: "Inter", sans-serif;

  /* ICON slightly down (perfect middle spot) */
  img {
    width: 120px;
    height: auto;
    transform: translateY(25px);   /* ⭐ SLIGHTLY DOWN */
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    margin-top: 10px;
  }

  .label {
    font-size: 18px;
    font-weight: 500;
    color: #444;
  }

  .value {
    font-size: 40px;
    font-weight: 700;
  }
`;
