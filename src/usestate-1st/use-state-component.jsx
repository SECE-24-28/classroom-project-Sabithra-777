{/*import React, { useState } from "react";
const UseStateComponent = () => {
  //   let count = 0;
  const [count, setCount] = useState(0);
  let sum = 0;
  const fun1 = (count) => {
    sum = sum + count;
    console.log("HEllo EShwar", sum);
  };
  return (
    <div>
      <h1>Counter</h1>
      <button onClick={fun1}>Increase</button> 
      <button onClick={() => fun1(1000)}>Increase</button>
    </div>
  );
};
export default UseStateComponent;
*/}
import React, { useState } from "react";
const UseStateComponent = () => {
  //   let count = 0;
  const [count, setCount] = useState(0);
  //
  const changeCountValue = (val) => {
    if (val == -1) {
      if (count <= 0) {
        return;
      }
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };
  return (
    <div>
      <h1>Counter</h1>
      {/* <button onClick={fun1}>Increase</button> */}
      <h2>{count}</h2>
      <button onClick={() => changeCountValue(1)}>Increase</button>
      <button onClick={() => changeCountValue(-1)}>Decrease</button>
    </div>
  );
};
export default UseStateComponent;