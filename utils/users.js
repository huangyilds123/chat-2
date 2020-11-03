let users = [];

// Join user to chat 
function userJoin(id, username, room) {
    const user = {
        id,
        username,
        room
    }
    users.push(user);

    return user;
}

// get current user 
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// delete a user when user has left 
function userLeave(id) {
    users = users.filter(user => user.id !== id)
    return users;
}

// get room users 
function getRoomUsers(room) {
    return users.filter(user => user.room == room);
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers }