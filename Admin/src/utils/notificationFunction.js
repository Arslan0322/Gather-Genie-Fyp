import { socket } from '../socket';

export const refundNotification = async (reported, vendor, totalAmount, name, client, createNotification) => {
  let vendorNotificationData;
  let clientNotificationData;
  if (reported) {
    // have to send refund notification to both vendor and client
    vendorNotificationData = {
      receiverId: vendor,
      text: `Admin has refunded ${totalAmount} against ${name} due to report`,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };

    clientNotificationData = {
      receiverId: client,
      text: `Admin has refunded ${totalAmount} against ${name} due to report`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };
  } else {
    vendorNotificationData = {
      receiverId: vendor,
      text: `${totalAmount} has been refunded against ${name}`,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };

    clientNotificationData = {
      receiverId: client,
      text: `${totalAmount} has been refunded against ${name}`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };
  }

  await createNotification(vendorNotificationData);
  await createNotification(clientNotificationData);

  socket.emit('send-notification', vendorNotificationData);
  socket.emit('send-notification', clientNotificationData);
};

export const releaseNotification = async (reported, vendor, totalAmount, name, client, createNotification) => {
  if (reported) {
    const vendorNotificationData = {
      receiverId: vendor,
      text: `Admin has rejected report against your service ${name}`,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };
    const clientNotificationData = {
      receiverId: client,
      text: `Admin has rejected your report against ${name}`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };

    await createNotification(vendorNotificationData);
    await createNotification(clientNotificationData);

    socket.emit('send-notification', vendorNotificationData);
    socket.emit('send-notification', clientNotificationData);
  } else {
    const vendorNotificationData = {
      receiverId: vendor,
      text: `${totalAmount} has been released against ${name}`,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };

    await createNotification(vendorNotificationData);
    socket.emit('send-notification', vendorNotificationData);
  }
};
