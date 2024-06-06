const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares.js")
const controller = require("./controllers.js")

// Importing our controllers
const { 
    createChat,
    findChat,
    userChat,
    createMessage,
    getMessages
} = controller;

// making the routes
router.post('/', createChat);
router.post('/message', createMessage);
router.get('/message/:chatId', getMessages);
router.get('/:userId', userChat);
router.get('/find/:firstId/:secondId', findChat);

module.exports = router;