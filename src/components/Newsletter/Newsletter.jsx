import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px;
  background: #1e3a8a;
  color: white;
  border-radius: 12px;
  width: 80%;
  margin: 50px auto;
  text-align: center;
`;

const InputBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  input {
    padding: 12px;
    width: 250px;
    border-radius: 8px;
    border: none;
  }

  button {
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    background: white;
    color: #1e3a8a;
    font-weight: 600;
  }
`;

const Newsletter = () => {
  return (
    <Section>
      <h2>Subscribe to our newsletter</h2>
      <p>Stay updated with the latest courses</p>

      <InputBox>
        <input placeholder="Email Address" />
        <button>Sign In</button>
      </InputBox>
    </Section>
  );
};

export default Newsletter;
