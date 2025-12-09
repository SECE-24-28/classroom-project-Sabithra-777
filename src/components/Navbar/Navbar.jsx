import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e3a8a;
`;

const Menu = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  font-size: 16px;
  color: #374151;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  gap: 20px;
`;

const SignIn = styled.button`
  background: none;
  border: none;
  font-weight: 600;
`;

const Register = styled.button`
  padding: 8px 20px;
  color: white;
  background: #1e3a8a;
  border-radius: 6px;
  border: none;
  font-weight: 600;
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Ipsum</Logo>

      <Menu>
        <li>Home</li>
        <li>Courses</li>
        <li>Our Service</li>
        <li>Contact us</li>
      </Menu>

      <Right>
        <SignIn>Sign In</SignIn>
        <Register>Register</Register>
      </Right>
    </Nav>
  );
};

export default Navbar;
