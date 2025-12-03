import React, { useState } from "react";
import {
  Container,
  Heading,
  FormGroup,
  Label,
  Input,
  SubmitButton,
} from "./SemResultStyles";  // <-- imported styles

const SemResult = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
  };
     
  return (
    <Container>
      <Heading>Sem Result Form</Heading>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Container>
  );
};

export default SemResult;