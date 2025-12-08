import React, { useState } from "react";
import {
  FormWrapper,
  Title,
  FormGrid,
  Input,
  Select,
  Label,
  PasswordRules,
  SubmitButton,
} from "./registration-form-style";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    college: "",
    passoutYear: "",
    department: "",
    degree: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
  };

  return (
    <FormWrapper>
      <Title>
        <span className="blue">Welcome to </span><br></br>Aptitude Guru Hem <span className="red">LMS</span>
      </Title>

      <form onSubmit={handleSubmit}>
        <FormGrid>
          <div>
            <Label>First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <Label>Select College</Label>
            <Select id="college" value={formData.college} onChange={handleChange}>
              <option>AGH B2C</option>
              <option>SECE</option>
              <option>KGISL</option>
            </Select>
          </div>

          <div>
            <Label>Select Passout Year</Label>
            <Select
              id="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </Select>
          </div>

          <div>
            <Label>Department</Label>
            <Select
              id="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option>CSE</option>
              <option>ECE</option>
              <option>MECH</option>
            </Select>
          </div>

          <div>
            <Label>UG or PG</Label>
            <Select id="degree" value={formData.degree} onChange={handleChange}>
              <option>UG</option>
              <option>PG</option>
            </Select>
          </div>

          <div>
            <Label>Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div>
            <Label>Mobile</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <PasswordRules>
              • minimum 8 characters  
              • one lowercase  
              • one uppercase  
              • one special character  
              • one number
            </PasswordRules>
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter confirm password"
            />
          </div>
        </FormGrid>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default RegistrationForm;

