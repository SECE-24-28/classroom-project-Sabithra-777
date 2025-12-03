import React from "react";
import styled from "styled-components";

const CapsuleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Capsule = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 40px 30px;
  text-align: center;
  background: #ff2a4e;
  color: white;
  border-radius: 80px;
  border: 3px solid red;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 5px 0;
`;

const SubText = styled.p`
  font-size: 1.2rem;
`;

const HeroCapsule = () => (
  <CapsuleWrapper>
    <Capsule>
      <Heading>Learners Today, Leaders Tomorrow</Heading>
      <SubText>
        With our continuous research and development, we provide you with an
        excellent Aptitude training.
      </SubText>
    </Capsule>
  </CapsuleWrapper>
);

export default HeroCapsule;
