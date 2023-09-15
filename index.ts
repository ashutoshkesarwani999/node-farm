import fs from 'fs';

//synchronous code or Blocking code

console.log("Synchronos/Blocking Code")

const readIn = fs.readFileSync('/home/cooper/node-project/node-farm/txt/input.txt','utf-8');
// console.log(readIn)

fs.readFile('./txt/start.txt',(err,data)=>{
    console.log(data.toString())
})
console.log("lgging")

console.log("Asynchronous/Non-Blocking Code")
//Asynchronous Code or Non-Blocking Code
fs.readFile('./txt/start.txt',(err,data1)=>{
    fs.readFile(`./txt/${data1.toString()}.txt`,(err2,data2)=>{
        console.log(data2.toString())
        fs.readFile('./txt/append.txt',(err3,data3)=>{
            console.log(data3.toString())
            fs.writeFile('./txt/final.txt',`${data2.toString()}\n${data3.toString()}`,'utf-8',err=>{
                console.log('Your file has been written')
            })
        })
    })
});

console.log('Will Read File');