const PRE = "DELTA"
const SUF = "MEET"

var room_id;
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stram;
var screenStrem;

var peer = null;
var currentPeer = null;
var screeenSharing = false;


// create room function...
function createRoom() {
    console.log("Room has been created")
    const room = document.getElementById("room-input").value;

    // check room should not empty.
    if (room == " " || room == " ") {
        alert("Please submit room id")
        return;
    }
    room_id = PRE + room + SUF;
    peer = new Peer(room_id);

    peer.on('open', (id) => {
        console.log("Peer has joined ID no", id);
        hideModal()
        // media options...
        getUserMedia({ video: true, audio: true},
            (stream)=>{
                local_stream = stream;
                setLocalStream(local_stream)
            },(err)=>{
                console.log(err);
            })
            notify("Waiting for the peer to join.")
})
 peer.on("call",(call)=>{
    call.answer(local_stream);
    call.on("stream",(stream)=>{
        setRemoteStream(stream);
    })
    currentPeer = call;
 })
}

function setLocalStream(stream){

    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}

function setRemoteStream(stream){

    let video = document.getElementById("remote-video");
    video.srcObject = stream;
    video.play();
}


function hideModal(){
    document.getElementById("entry-modal").hidden = true;
}

function notify(msg){

    let notification = document.getElementById("notification");
    notification.innerHTML = msg;
    notification.hidden = false;

    setTimeout(()=>{
        notification.hidden = true;
    },3000);
}


function joinRoom(){
    console.log('User is Joining Room')

    let room = document.getElementById("room-input").value;
    if(room==" "||room==""){
        alert("Please enter room number")
        return;
    }
    room_id = PRE + room + SU
}

