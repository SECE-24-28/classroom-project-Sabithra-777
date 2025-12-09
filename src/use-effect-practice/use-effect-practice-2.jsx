import React, { useEffect, useState } from "react";
const UseEffectPracticeTwo = () => {
  const [second, setSecond] = useState(0);
  useEffect(() => {
    console.log("Time started");
    const interval = setInterval(() => {
      //setSecond((prevSecond) => prevSecond + 1);
      setSecond(second + 1);
      // console.log("Seconds passed:", second + 1);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [second]);
  return (
    <div>
      <h1>Seconds passed: {second}</h1>
    </div>
  );
};
export default UseEffectPracticeTwo;