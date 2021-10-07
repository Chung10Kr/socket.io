import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*",(req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${port}`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [

];
wss.on( "connection" , (socket)=>{
    sockets.push(socket);
    socket.on("close", () => console.log("DisConnected From the Browser.!") );
    socket.on("message",(message)=>{
        sockets.forEach(aSocket => aSocket.send(message.toString('utf8') ) );
    })
    socket.send( "Hellow" );
});

server.listen(port, handleListen);