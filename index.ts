import fs from 'fs';
import http from 'http';
import path from 'path';

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    console.log("Request Object", req.url)
    const pathName = req.url
    if (pathName == '/overview' || pathName == '/') {
        res.end('Hello from the server!')
    }
    else if (pathName == '/product') {
        res.end('This is Product')
    }
    else if (pathName == '/api') {

        // This will re read the data from JSON file everytime we hit the /api 
    //     fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => { 
    //         const productData = JSON.parse(data) 
    //         console.log(typeof data)

    //         res.writeHead(200,{'Content-type':'application/json'});
    //         res.end(data);
    // })
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);

        // res.end('API')
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html', // represents the content displayed on browser is HTML hence res.end has html tag attached
            'my-own-header': 'hello-world' // our own header to explain the error if we want to
        });
        res.end('<h1>Page not found!</h1>')
    }

})

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to port 8000")
})