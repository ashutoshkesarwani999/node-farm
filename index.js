const fs = require('fs');

//synchronous code or Blocking code
const textIn = fs.readFileSync("/home/cooper/node-project/node-farm/txt/input.txt",'utf-8');
console.log(textIn);

fs.readFile('./txt/start.txt')