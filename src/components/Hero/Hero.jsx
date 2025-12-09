import React from "react";
import styled from "styled-components";
import heroImg from "../../assets/hero.jpg"; // <-- use your image

const HeroWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem;
  background: #fef3e7;
  border-radius: 12px;
  margin-top: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;

  span {
    color: #f59e0b; /* orange */
  }
`;

const SubText = styled.p`
  margin: 1rem 0;
  color: #6b7280;
  font-size: 1rem;
  width: 80%;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.8rem 1.6rem;
    border: none;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  .shopNow {
    background: #f59e0b;
    color: white;
  }

  .invite {
    background: white;
    color: #111827;
    border: 1px solid #d1d5db;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const HeroImage = styled.img`
  width: 90%;
  height: auto;
  border-radius: 12px;
`;

const Hero = () => {
  return (
    <HeroWrapper>
      <Left>
        <Title>
          Furniture That <br /> Elevates Your <span>Space</span>
        </Title>

        <SubText>
          Crafted for comfort. Designed for modern living.
        </SubText>

        <ButtonRow>
          <button className="shopNow">Shop Now</button>
          <button className="invite">Check New Arrivals</button>
        </ButtonRow>
      </Left>

      <Right>
        <HeroImage src={heroImg} alt="Furniture" />
      </Right>
    </HeroWrapper>
  );
};

export default Hero;
