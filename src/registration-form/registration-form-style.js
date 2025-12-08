import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  .blue{
    color: #3668dcff;
  }
  .red {
    color: #e63946;
    font-weight: bold;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-size: 15px;
  margin-bottom: 4px;
  display: block;
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  margin-bottom: 4px;
`;

export const Select = styled.select`
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

export const PasswordRules = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #6b6b6b;
  line-height: 1.5;
`;

export const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  width: 120px;
  font-size: 16px;
  border: none;
  background: #e63946;
  color: white;
  border-radius: 6px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;
