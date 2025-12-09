import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 25px;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const Card = styled.div`
  min-width: 260px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
`;

const Img = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
`;

const Trending = () => {
  const items = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=60",
  ];

  return (
    <Wrapper>
      <Title>Trending Now</Title>
      <Flex>
        {items.map((img, i) => (
          <Card key={i}>
            <Img src={img} />
          </Card>
        ))}
      </Flex>
    </Wrapper>
  );
};

export default Trending;
