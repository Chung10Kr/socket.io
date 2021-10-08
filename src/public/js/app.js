const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nickForm    = document.querySelector("#nick");
const socket = new WebSocket( `ws://${window.location.host}` );

function makeMsg(type, payload){
    const msg = {type,payload};
    return JSON.stringify(msg);
}
socket.addEventListener("open", ()=>{
    console.log("Connect to Browser");
});
socket.addEventListener("message" , (message)=>{
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})
socket.addEventListener("close", ()=>{
    console.log("Connect to Server");
});

messageForm.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send( makeMsg("new_msg" , input.value) );
    input.value = "";
})
nickForm.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send( makeMsg("nickname" , input.value) );
    input.value = "";

});