import React, { useState } from "react";
const AdditionOperationComponent = () => {
  const [fruites, setFruites] = useState(["apple", "banana"]);
  const addFruites = () => {
    setFruites([...fruites, "mango"]);
    setFruites([...fruites, "grapes"]);
    // setFruites
    console.log("The fruites:", fruites);
  };
  return (
    <div>
      <button onClick={addFruites}>Add Fruits</button>
    </div>
  );
};
export default AdditionOperationComponent;