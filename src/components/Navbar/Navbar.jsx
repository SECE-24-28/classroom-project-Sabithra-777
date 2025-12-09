import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  padding: 15px 60px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-family: "Inter", sans-serif;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
  font-size: 15px;
  color: #444;

  li {
    cursor: pointer;
  }

  li:hover {
    color: #ff9e1b;
  }
`;

const NavRight = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

const SignInBtn = styled(Button)`
  background: transparent;
`;

const RegisterBtn = styled(Button)`
  background: #ff9e1b;
  color: white;
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLeft>
        <Logo>Velasco Living</Logo>

        <NavLinks>
          <li>Home</li>
          <li>Explore</li>
          <li>About Us</li>
          <li>Trending</li>
          <li>Contact</li>
        </NavLinks>
      </NavLeft>

      <NavRight>
        <SignInBtn>Sign In</SignInBtn>
        <RegisterBtn>Register</RegisterBtn>
      </NavRight>
    </Nav>
  );
};

export default Navbar;
