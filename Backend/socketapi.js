let io;
let activeUsers = [];
let socketServer = function (server) {
    io = require('socket.io')(server, { cors: { origin: '*' } });
    io.on('connection', function (socket) {

        // console.log(`Socket has been connected : ${socket.id}`)

        // add new User
        socket.on("new-user-add", (newUserId) => {
            // if user is not added previously
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
                console.log("New User Connected", activeUsers);
            }
            // send all active users to new user
            io.emit("get-users", activeUsers);
        });

        socket.on("disconnect", () => {
            // remove user from active users
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("User Disconnected", activeUsers);
            // send all active users to all users
            io.emit("get-users", activeUsers);
        });

        socket.on("logoutAdmin", (id) => {
            // remove user from active users
            activeUsers = activeUsers.filter((user) => user.userId !== id);
            console.log("User Disconnected", activeUsers);
            // send all active users to all users
            io.emit("get-users", activeUsers);
        });

        // send message to a specific user
        socket.on("send-message", (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            if (user) {
            io.to(user.socketId).emit("recieve-message", data);
            }
        });

        socket.on("send-notification", (data)=>{
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            console.log("Sending from socket to :", receiverId)
            console.log("Data: ", data)
            console.log("User: ", user)
            if (user) {
            io.to(user.socketId).emit("receive-notification", data);
            }
        })

        socket.on("send-notification-to-admin", (data)=>{
            const { toAdmin } = data;
            let user;
            if(toAdmin){
                user = activeUsers.find((user) => user.userId === 1234);
                console.log("Sending from socket to :", toAdmin)
                console.log("Data: ", data)
                console.log("User: ", user)
            }
            if (user) {
            io.to(user.socketId).emit("receive-notification", data);
            }
        })
        
    });
}

let Socket = function () {
    return {
        emit: function (event, data) {
            io.sockets.emit(event, data);
        }
    }
}
exports.socketServer = socketServer;
exports.Socket = Socket;