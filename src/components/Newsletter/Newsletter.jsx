import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 70px 20px;
  background: #6b46c1;
  color: white;
  text-align: center;
`;

const Input = styled.input`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  width: 260px;
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-left: 10px;
  border-radius: 8px;
  background: #fff;
  color: #6b46c1;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Section>
      <h2>Subscribe to our Newsletter</h2>
      <p>Get updates on new furniture & exclusive discounts</p>

      <div style={{ marginTop: "20px" }}>
        <Input placeholder="Enter email" />
        <Button>Subscribe</Button>
      </div>
    </Section>
  );
};

export default Newsletter;
