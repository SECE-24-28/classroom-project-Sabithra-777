import React, { useState } from "react";
const UsestateformComponent = () => {
  const [name, setName] = useState("");
  const fun1 = (e) => {
    //console.log("Hello this is changed", e.target.value);
    setName(e.target.value);
  };
  const submitthings = () => {
    console.log("The name is :", name);
  };
  return (
    <div>
      <h1>Use State Form Component</h1>
      <form action={submitthings}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={fun1} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default UsestateformComponent;