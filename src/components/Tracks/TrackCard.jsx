import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  background: white;
  border: 1px solid #eee;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const Title = styled.h3`
  margin: 10px 0;
`;

const Price = styled.p`
  font-weight: 700;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #1e3a8a;
  color: white;
  margin-top: 10px;
`;

const TrackCard = ({ img, title, price }) => {
  return (
    <Card>
      <Img src={img} />
      <Title>{title}</Title>
      <Price>{price}</Price>
      <Button>Join Course</Button>
    </Card>
  );
};

export default TrackCard;
