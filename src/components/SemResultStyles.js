import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 25px;
  border-radius: 10px;
  background: #527079ff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

export const Heading = styled.h2`
  text-align: center;
  color: #f6f0faff;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #e2dbdbff;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaaaaaff;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #4a90e2;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: #4a90e2;
  color: white;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #357ab8;
  }
`;