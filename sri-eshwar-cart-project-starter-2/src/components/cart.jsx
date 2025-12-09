import React from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    position: relative;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: -7rem;
  z-index: 10;
  margin-left: auto;
  margin-right: auto;
`;

const ProfileImage = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  width: 140px;
  height: 140px;
  z-index: 25;
`;

const ImageBackground = styled.div`
  width: 140px;
  height: 140px;
  background-color: #8b5cf6;
  border-radius: 9999px;
  position: absolute;
  top: -6px;
  z-index: -10;
  left: 10px;
`;

const NameContainer = styled.div`
  text-align: center;
  margin-top: 1.75rem;
`;

const Name = styled.p`
  letter-spacing: 0.05em;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: capitalize;
`;

const Job = styled.p`
  color: #c4b5fd;
  text-transform: uppercase;
  font-size: 0.875rem;
`;

const QuoteIconContainer = styled.div`
  color: #a78bfa;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.25rem;
`;

const ReviewText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #64748b;
`;

const Card = (props) => {
  let review = props.review;
  return (
    <Container>
      <ImageContainer>
        <ProfileImage src={review.image} alt={review.name} />
        <ImageBackground />
      </ImageContainer>

      <NameContainer>
        <Name>{review.name}</Name>
        <Job>{review.job}</Job>
      </NameContainer>

      <QuoteIconContainer>
        <FaQuoteLeft />
      </QuoteIconContainer>

      <ReviewText>{review.text}</ReviewText>

      <QuoteIconContainer>
        <FaQuoteRight />
      </QuoteIconContainer>
    </Container>
  );
};

export default Card;
