import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  padding: 40px 20px;
  background: #1f2937;
  color: white;
  text-align: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      MERN Furniture © {new Date().getFullYear()} — All Rights Reserved
    </Wrapper>
  );
};

export default Footer;
