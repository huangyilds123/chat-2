

const socket = io();

//Join room 


//GetUser and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

document.getElementById('room-name').innerHTML = room

socket.emit('joinRoom', { room: room, username: username });

socket.on('getUsers', users => {
    // console.log(users);
    // output the users 
    const userList = document.getElementById('users');
    userList.innerHTML = ``;
    for (let i = 0; i < users.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<li>${users[i].username}</li>`;
        userList.appendChild(li);
    }


})

socket.on('message', (data) => {
    // console.log(data);
    const div = document.createElement('div');
    let results = `
    <div class="message">
      <p class="meta">${data.username} <span>${moment().format('MMM Do YY, h:mm a')}</span></p>
     <p class="text">
      ${data.text}
       </p>
      </div>
    `
    div.innerHTML = results;
    document.querySelector('.chat-messages').appendChild(div);
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;

})

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('msg').value;

    //Emit a message to server
    const chatInfo = {
        username,
        text,
        room

    }
    socket.emit('chatMessage', chatInfo);
    document.getElementById('msg').value = "";


})