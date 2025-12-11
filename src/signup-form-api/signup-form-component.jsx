import React, { useEffect, useState } from "react";
import axios from "axios";
const SignupFormComponent = () => {
  const [getDetails, setGetDetails] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("=>(The value:)>=", e.target.email.value);
    // console.log("The first name:", e.target.firstname.value);
    try {
      console.log("CHECK ENTRY 2381");

      const pushDetails = await axios.post(
        "http://localhost:21000/api/v1/User/userRegister",
        {
          firstName: e.target.firstname.value,
          email: e.target.email.value,
          secondName: e.target.secondname.value,
          mobile: e.target.mobile.value,
          password: e.target.password.value,
        }
      );
      console.log("The push details:", pushDetails);

      if (pushDetails.data.success === true) {
        console.log("The process is successful");
      } else {
        console.log("Error occured");
      }
    } catch (e) {
      console.log("Error:", e.message);
    }
  };
  const getDetailsFunction = async () => {
    try {
      const getDetails = await axios.get(
        "http://localhost:21000/api/v1/User/getUsers"
      );
      setGetDetails(getDetails.data.data);
    } catch (e) {
      console.log("Error:", e);
    }
  };
  useEffect(() => {
    getDetailsFunction();
  }, []);
  console.log("The main data:", getDetails);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <label htmlFor="firstname">First name</label>
        <input type="text" id="firstname" />
        <label htmlFor="secondname">Second name</label>
        <input type="text" id="secondname" />
        <label htmlFor="mobile">Mobile number</label>
        <input type="number" id="mobile" />
        <label htmlFor="password">Password</label>
        <input type="number" id="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignupFormComponent;