const asyncHandler = require("express-async-handler");
const Notifications = require("./model")


//  @desc   :  Create Notification
//  @Route  :  POST /notifications
//  @access :  Public
const createNotification = asyncHandler( async (req,res) => {
  try {
    const {receiverId, senderId, text, url} = req.body;
    const toAdmin = req.body?.toAdmin;

    let notification;
    let newNotification;
    if(toAdmin){
      newNotification = new Notifications({
        toAdmin:true, 
        senderId,
        text,
        url,
      });
    } else {
      newNotification = new Notifications({
        receiverId, 
        senderId,
        text,
        url,
      });
    }

    notification = await newNotification.save();
    res.status(200).json(notification)
  } catch (error) {
    res.status(500)
    throw new Error(error?.message);
  }
});

//  @desc   :  Get Notification
//  @Route  :  GET /notifications
//  @access :  Private
const getNotifications = asyncHandler(async(req, res) => {
    const id = req.user._id

    try {
        const notification = await Notifications.find({receiverId : id}).sort({createdAt: -1}).exec();
        res.status(200).json(notification);
    } catch (error) {
        res.status(500);
        throw new Error(error.message); 
    }
})


//  @desc   :  Making isRead true for Notification after clicking on view button
//  @Route  :  PUT /notifications/:id
//  @access :  Public
const readNotification = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
  
      const availableNotification = await Notifications.findById(id);
      if (!availableNotification) {
        return res.status(404).json({ error: "Notification is not available" });
      }
  
      await Notifications.findByIdAndUpdate(id, { isRead: true }, { new: true });
  
      return res.status(200).json("Notification has been marked as read");
    } catch (error) {
        res.status(500);
        throw new Error(error.message); 
    }
  });


  //  @desc   :  Making isRead true for Notification after clicking on view button
//  @Route  :  PUT /notifications/view
//  @access :  Private
  const viewNotification = async (req, res) => {
    const id = req.user._id
    try {
      // Update the isCount field to true for all documents in the collection
      await Notifications.updateMany({    receiverId: id }, { isCount: true });
  
      return res.status(200).json({ message: "Notification has been marked as read" });
    } catch (error) {
      return res.status(500).json({ error: error.message || "Something went wrong" });
    }
  };


//  Exporting the routes
module.exports = {
    getNotifications,
    readNotification,
    createNotification,
    viewNotification
}