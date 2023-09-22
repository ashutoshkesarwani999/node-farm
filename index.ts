import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url'
/*synchronous code or Blocking code

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
    if(err) return console.log("ERROR: ",err)
    fs.readFile(`./txt/${data1.toString()}.txt`,(err2,data2)=>{
        if(err) return console.log("ERROR: ",err)

        console.log(data2.toString())
        fs.readFile('./txt/append.txt',(err3,data3)=>{
            if(err) return console.log("ERROR: ",err)

            console.log(data3.toString())
            fs.writeFile('./txt/final.txt',`${data2.toString()}\n${data3.toString()}`,'utf-8',err=>{
                if(err) return console.log("ERROR: ",err)

                console.log('Your file has been written')
            })
        })
    })
});
console.log('Will Read File');
*/

// SERVER


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const replaceTemplate = (tempCard: any, product: any) => {
    let output = tempCard.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output


}
//This will read the file once without blocking the server requests and pass the data to the user
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj:any[] = JSON.parse(data)

const server = http.createServer((req, res) => {
    console.log("Request Object", req.url)
    const { pathname, query } = req.url ? url.parse(req.url, true) : { pathname: "", query: { id: "" } }

    if (pathname == '/overview' || pathname == '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = dataObj.map((el: any) => replaceTemplate(tempCard, el)).join('');
        console.log(cardsHtml)
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)
    }
    else if (pathname == '/product') {
        console.log('query is ', typeof JSON.parse(JSON.stringify(query)).id)
        const product = dataObj.find((el: any) => 
            // console.log('id is ', typeof el.id.toString());
        el.id.toString() == JSON.parse(JSON.stringify(query)).id
                
        )
        console.log( product)
        const output = replaceTemplate(templateProduct,product)
        res.writeHead(200,{'Content-type':'text/html'})
        console.log(output)
        res.end(output)
        // res.end('This is Product')
    }
    else if (pathname == '/api') {

        // This will re read the data from JSON file everytime we hit the /api 
        //     fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => { 
        //         const productData = JSON.parse(data) 
        //         console.log(typeof data)

        //         res.writeHead(200,{'Content-type':'application/json'});
        //         res.end(data);
        // })
        res.writeHead(200, { 'Content-type': 'application/json' });
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