import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/loading-spinner-component";
const UseEffectPracticeThree = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fun1 = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        console.log("Fetched data:", response.data);
      } catch (err) {
        console.log("Error while fetching data:", err);
      }
      setLoading(false);
    };
    fun1();
    console.log("the data:", data);
  }, []);
  //   if (loading) {
  //     return <LoadingSpinner />;
  //   }
  return (
    <div>
      <h1>useEffect practice</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        data.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default UseEffectPracticeThree;