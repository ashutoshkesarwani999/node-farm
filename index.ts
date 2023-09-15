import fs from 'fs';
import http from 'http';

//synchronous code or Blocking code

// console.log("Synchronos/Blocking Code")

// const readIn = fs.readFileSync('/home/cooper/node-project/node-farm/txt/input.txt','utf-8');
// // console.log(readIn)

// fs.readFile('./txt/start.txt',(err,data)=>{
//     console.log(data.toString())
// })
// console.log("lgging")

// console.log("Asynchronous/Non-Blocking Code")
// //Asynchronous Code or Non-Blocking Code
// fs.readFile('./txt/start.txt',(err,data1)=>{
//     if(err) return console.log("ERROR: ",err)
//     fs.readFile(`./txt/${data1.toString()}.txt`,(err2,data2)=>{
//         if(err) return console.log("ERROR: ",err)

//         console.log(data2.toString())
//         fs.readFile('./txt/append.txt',(err3,data3)=>{
//             if(err) return console.log("ERROR: ",err)

//             console.log(data3.toString())
//             fs.writeFile('./txt/final.txt',`${data2.toString()}\n${data3.toString()}`,'utf-8',err=>{
//                 if(err) return console.log("ERROR: ",err)

//                 console.log('Your file has been written')
//             })
//         })
//     })
// });
// console.log('Will Read File');

// SERVER

const server = http.createServer((req,res)=>{
    console.log("Request Object",req)
res.end('Hello from the server!')

})
 
server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to port 8000")
})