import React from "react";
import styled from "styled-components";
import heroImg from "../../assets/hero.png"; 

const Section = styled.section`
  padding: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Left = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;

  span {
    color: #2563eb;
  }
`;

const Text = styled.p`
  margin: 20px 0;
  color: #6b7280;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 12px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 12px 20px;
  background: #2563eb;
  border: none;
  color: white;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 450px;

  @media (max-width: 900px) {
    width: 300px;
    margin-top: 20px;
  }
`;

const Hero = () => {
  return (
    <Section>
      <Left>
        <Title>
          The <span>Smart</span> Choice For <span>Future</span>
        </Title>
        <Text>
          ipsum is a global training provider based across 6 continents.
        </Text>

        <SearchBox>
          <Input placeholder="Search Courses..." />
          <Button>Continue</Button>
        </SearchBox>
      </Left>

      <Image src={heroImg} />
    </Section>
  );
};

export default Hero;
