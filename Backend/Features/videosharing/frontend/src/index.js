// const socket = io('http://localhost:8080/');


const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('joinRoom');
joinRoom.onclick = (e) => {
    e.preventDefault();  

    const RoomID = roomID.value;

    localStorage.setItem("RoomID" , RoomID)

    window.location.href = "./chat.html"
}




