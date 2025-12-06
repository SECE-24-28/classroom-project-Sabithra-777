// let x = 2;
// console.log("The value x is :", x);
let arr = [1, 2, 3, 4];
// console.log("The array is", arr);
// console.log("The array is", arr[0]);
let arrString = ["Sai", "ram", "sree"];
// console.log("The first character:",arrString[0]);
arrString.push("Eshwar");
// console.log("The arry string:", arrString);
//arrString[0][0]
// console.log("The char is:", arrString[0][0]);

// const arrConst = ["AGH", "GHJ", "ABC"];
// arrConst[0]="ZZZ";
// arrConst.push("HHH");
// console.log("The alphabtes:", arrConst);

// const arrObject = { name: "Sai", lastName: "AGH", age: 12 };
// console.log("The array object:", arrObject.name);

// const date = new Date("2022-03-25");
// console.log("The date data:", date);

// console.log("The type:", typeof "Sai");
// console.log("The number:", typeof 0);

// let carName1 = "AGH LMS";
// carName1 = carName1.replace("A", "B");
// console.log("The print sctipt:", carName1);
// console.log("The 1st char:", carName1[0]);

// function addition(a,b)
// {
//     console.log("Addition",a+b);

// }
// addition(1,2);

// const addition = (a, b) => {
//   return a + b;
// };
// console.log("The ans:", addition(10, 20));

let arrObject = [
  { name: "A", mark: 100, address: "Chennai" },
  { name: "B", mark: 95, address: "Kovai" },
  { name: "C", mark: 96, address: "Mumbai" },
];

// for (let i = 0; i < arrObject.length; i++) {
//   console.log("Name:", arrObject[i].name);
//   console.log("Mark:", arrObject[i].mark);
//   console.log("Address:", arrObject[i].address);
// }
// arrObject.map((item, index) => {
//   console.log("The elment:", item.name);
// });

const person = { name: "John", age: "45", address: "Chennai" };
const value = Object.values(person);
// console.log("The values:", value);
let listElement = value.toString();

console.log("Last element:", listElement);