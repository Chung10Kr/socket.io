const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket( `ws://${window.location.host}` );

socket.addEventListener("open", ()=>{
    console.log("Connect to Browser");
});
socket.addEventListener("message" , (message)=>{
    console.log(`Just got this ${message.data} from Server`);
})
socket.addEventListener("close", ()=>{
    console.log("Connect to Server");
});

messageForm.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send( input.value );
    input.value = "";
})