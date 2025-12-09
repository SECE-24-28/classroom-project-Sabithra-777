import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px 20px;
  background: #f8f5ff;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 900px;
  margin: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2,1fr);
  }
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
`;

const Testimonials = () => {
  return (
    <Section>
      <Title>What Our Customers Say</Title>

      <Grid>
        <Card>“Amazing quality furniture, super fast delivery!”</Card>
        <Card>“The best modern furniture collection!”</Card>
      </Grid>
    </Section>
  );
};

export default Testimonials;
