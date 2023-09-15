const fs = require('fs');

const textIn = fs.readFileSync("/home/cooper/node-project/node-farm/txt/input.txt",'utf-8');
console.log(textIn);

fs.readFile('./txt/start.txt')