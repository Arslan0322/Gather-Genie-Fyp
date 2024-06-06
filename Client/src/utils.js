import { socket } from "./socket";

export const vendorCreationNotificationAdmin = (id, name) =>{
    const data={
        senderId:id,
        toAdmin:true,
        text:`${name} vendor is waiting for your approval`,
        url:'/home/requests',
        createdAt: `${new Date()}`
    }

    // sending to admin from socket
    socket.emit("send-notification-to-admin", data)

    return data;
}

export const ServiceCreationNotificationAdmin = (id, name) =>{
    const data={
        senderId:id,
        toAdmin:true,
        text:`${name} service is waiting for your approval`,
        url:`/home/requests/${id}`,
        createdAt: `${new Date()}`
    }

    // sending to admin from socket
    socket.emit("send-notification-to-admin", data)

    return data;
}