import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const Name = styled.p`
  margin-top: 12px;
  font-weight: bold;
`;

const Price = styled.p`
  color: #6b46c1;
`;

const Featured = () => {
  const products = [
    {
      name: "Premium Chair",
      price: "$120",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    },
    {
      name: "Classic Sofa",
      price: "$340",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
    {
      name: "Wooden Table",
      price: "$220",
      img: "https://i5.walmartimages.com/asr/31f39ac5-b02f-40ac-afa1-c91f0e6353c5.156a738d815c24a5c59152e2715fb47d.jpeg",
    },
    {
      name: "Office Desk",
      price: "$500",
      img: "https://westave.com/wp-content/uploads/2020/04/Corridor_Office_Isolated_Images_6507_6520_redo_SA_ver01-scaled.jpg",
    },
  ];

  return (
    <Section>
      <Title>Featured Products</Title>
      <Grid>
        {products.map((p, i) => (
          <Card key={i}>
            <Img src={p.img} alt={p.name} />
            <Name>{p.name}</Name>
            <Price>{p.price}</Price>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default Featured;
