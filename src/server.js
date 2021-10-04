import express from "express";

const app = express();
const port = 3000;
console.log("!!!");

app.listen(port,function(){
    console.log(`Start Node Server Port: ${port}`)
})