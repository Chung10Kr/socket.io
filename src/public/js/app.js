const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const nickname = document.getElementById("nickname")
const room = document.getElementById("room")

nickname.hidden = true
room.hidden = true

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message
    ul.appendChild(li)
}

function handleMessageSubmit(event) {
    event.preventDefault()
    const input = room.querySelector("#msg input");
    const value = input.value
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`)
    });
    input.value = ""
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = nickname.querySelector("#name input")
    socket.emit("nickname", input.value,roomName, showRoom)

}

function showRoom(newCount) {
    nickname.hidden = true;
    room.hidden = false;
    setRoomTitle(roomName , newCount);
    const msgForm = room.querySelector("#msg")
    msgForm.addEventListener("submit", handleMessageSubmit )
}
function setRoomTitle(roomName , newCount){
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`
}
function showNickname() {
    welcome.hidden = true;
    nickname.hidden = false;
    const nameForm = nickname.querySelector("#name")
    nameForm.addEventListener("submit", handleNicknameSubmit)
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showNickname)
    roomName = input.value;
    input.value = ""
}

form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", (user,newCount) => {
    setRoomTitle(roomName , newCount)
    addMessage(`${user} arrived!`)
})
socket.on("bye", (left,newCount) => {
    setRoomTitle(roomName , newCount)
    addMessage(`${left} left ㅠㅠ`)
})
socket.on("new_message", (msg)=>{addMessage(msg)});
socket.on("room_change", (rooms)=>{
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    rooms.forEach( room =>{
        const li = document.createElement("li");
        li.innerText = room;
        roomList.appendChild(li);
    });
})