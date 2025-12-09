// console.log("Start");
// for (let i = 0; i < 1e9; i++) {
//   console.log("Hello  world");
// }
// console.log("End");

//Syncronous

// console.log("Before");

// setTimeout(() => {
//   console.log("Sreesairam");
// }, 5000);
// console.log("After");
// https://jsonplaceholder.typicode.com/users

//  async function fetchApi(){
//     const response=await fetch("https://jsonplaceholder.typicode.com/users");
//     const ans=await response.json();
//     console.log("The user:",ans);

// }
// fetchApi();
import axios from "axios";

//  async function fetchApi() {
//    const response = await fetch("https://jsonplaceholder.typicode.com/users");
//    const ans = await response.json();
//    console.log("The user:", ans);
//  }
//  fetchApi();

// async function fetchApi() {
//   const response = await axios("https://jsonplaceholder.typicode.com/users");
//   console.log("The user:", response);
// }
// fetchApi();

// async function fetchApi() {
//   try {
//     const response = await axios("https://jsonplaceholder.typicode.com/users");
//     console.log("The user:", response);
//   } catch (error) {
//     console.log("Error", error);
//   }
// }

// fetchApi();

// https://dummyjson.com/products

// https://dummyjson.com/todos

// https://dummyjson.com/users

async function fetchMultipleApis() {
  let urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/users",
  ];
  let promises = urls.map((item) => fetch(item).then((res) => res.json()));
  let data = await Promise.all(promises);
  console.log("The data is printed:", data);

  //   console.log("Promises:", promises);
}

fetchMultipleApis();