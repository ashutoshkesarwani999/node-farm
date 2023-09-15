import fs from 'fs';
const readIn = fs.readFileSync('/home/cooper/node-project/node-farm/txt/input.txt','utf-8');
// console.log(readIn)

fs.readFile('./txt/start.txt',(err,data)=>{
    console.log(data.toString())
})
console.log("lgging")