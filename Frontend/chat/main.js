const socket = io('https://chatbackend-kp5c.onrender.com/', {
   transports:["websocket"]
});

// Global Variables 
const chatBody = document.querySelector('.chat-body');
const userTitle = document.getElementById('user-title');
const loginContainer = document.querySelector('.login-container');
const userTable = document.querySelector('.users');
const userTagline = document.querySelector('#users-tagline');
const title = document.querySelector('#active-user');
const messages = document.querySelector('.messages');
const msgDiv = document.querySelector('.msg-form');

// Global methods
const methods = {
    socketConnect: async (username, userID) => {
        socket.auth = { username, userID }
        await socket.connect();
    },
    // createSession: async (username) => {
    //     try {
    //         let res = await fetch("https://chatbackend-kp5c.onrender.com/session", {
    //             method: "POST",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username })
    //         })
    //         if(res){
    //             data = await res.json()
    //             methods.socketConnect(data.username, data.userID);
    
    //             // set localstorage for session
    //             localStorage.setItem('session-username', data.username);
    //             localStorage.setItem('session-userID', data.userID);
    
    //             loginContainer.classList.add('d-none');
    //             chatBody.classList.remove('d-none');
    //             userTitle.innerHTML = data.username;
    //         }
    //     } catch (error) {
    //         console.log("something went wrong in create session")   
    //     }
    // },
    setActiveUser: (username, userID) => {
        title.innerHTML = username;

        title.setAttribute('userID', userID);
        const list = document.getElementsByClassName('socket-users');
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('table-active');
        }
        event.currentTarget.classList.add('table-active');

        msgDiv.classList.remove('d-none');
        messages.classList.remove('d-none');
        messages.innerHTML = '';
        socket.emit('fetch-messages', { receiver: userID });
        const notify = document.getElementById(userID);
        notify.classList.add('d-none');
    },
    appendMessage: ({ message, time, background, position }) => {
        console.log(message);
        console.log(time);
        let div = document.createElement('div');
        div.classList.add('message', 'bg-opacity-25', 'rounded', 'm-2', 'px-2', 'py-1', background, position);
        div.innerHTML = `<span class="msg-text">${message}</span><span class="msg-time">${time}</span>`;
        messages.append(div);
        messages.scrollTo(0, messages.scrollHeight);
    }
}

// session variables
const userData = JSON.parse(localStorage.getItem("userdata"))
const sessUsername = userData.name
const sessUserID = userData.userid
// if(username && userid){
//     methods.socketConnect(username, userid);
//     localStorage.setItem('session-username', username);
//     localStorage.setItem('session-userID', userID);
// }
// const sessUsername = localStorage.getItem('session-username');
// const sessUserID = localStorage.getItem('session-userID');

if (sessUsername && sessUserID) {

    methods.socketConnect(sessUsername, sessUserID);

    // loginContainer.classList.add('d-none');
    // chatBody.classList.remove('d-none');
    userTitle.innerHTML = sessUsername;
}

// login form handler
// const loginForm = document.querySelector('.user-login');
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const username = document.getElementById('username');
//     methods.createSession(username.value.toLowerCase());
//     username.value = '';
// });

// user list table
socket.on('users', ({ users }) => {
    // removing self user
    const index = users.findIndex(user => user.userID === socket.id);
    if (index > -1) {
        users.splice(index, 1);
    }

    // generating user table list
    userTable.innerHTML = '';
    let ul = `<table class="table table-hover">`;
    for (const user of users) {
        ul += `<tr class="socket-users" onclick="methods.setActiveUser('${user.username.toUpperCase()}', '${user.userID}')"><td>${user.username.toUpperCase()}<span class="text-success ps-1 d-none " id="${user.userID}"><i class="fa-solid fa-circle"></i></span></td></tr>`;
    }
    ul += `</table>`;
    if (users.length > 0) {
        userTable.innerHTML = ul;
        userTagline.innerHTML = "Online Users";
        userTagline.classList.add('text-success');
        userTagline.classList.remove('text-danger');
    } else {
        userTagline.innerHTML = 'NO Active Users';
        userTagline.classList.remove('text-success');
        userTagline.classList.add('text-danger');
    }
});

// chat form handler
const msgForm = document.querySelector('.msgForm');
const message = document.getElementById('message');

msgForm.addEventListener('submit', e => {
    e.preventDefault();
    const to = title.getAttribute('userID');
    let time = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    // set new message payload
    let payload = {
        from: socket.id,
        to,
        message: message.value,
        time
    }

    // emit message to server
    socket.emit('message-to-server', payload);

    methods.appendMessage({ ...payload, background: 'bg-success', position: 'right' });

    message.value = '';
    message.focus();
});

// receive private message
socket.on('message-to-user', ({ from, message, time }) => {
    const receiver = title.getAttribute('userID');
    const notify = document.getElementById(from);
    if (receiver === null) {
        notify.classList.remove('d-none');
    } else if (receiver === from) {
        methods.appendMessage({
            message,
            time,
            background: 'bg-secondary',
            position: 'left'
        });
    } else {
        notify.classList.remove('d-none');
    }
});

// get stored messages from MongoDB
socket.on('stored-messages', ({ messages }) => {
    if (messages.length > 0) {
        messages.forEach(msg => {
            let payload = {
                message: msg.message,
                time: msg.time
            }
            if (msg.from === socket.id) {
                methods.appendMessage({
                    ...payload,
                    background: 'bg-success',
                    position: 'right'
                });
            } else {
                methods.appendMessage({
                    ...payload,
                    background: 'bg-secondary',
                    position: 'left'
                });
            }
        })
    }
});

socket.on('user-away', userID => {
    const to = title.getAttribute('userID');
    if (to === userID) {
        title.innerHTML = '&nbsp;';
        msgDiv.classList.add('d-none');
        messages.classList.add('d-none');
    }
})