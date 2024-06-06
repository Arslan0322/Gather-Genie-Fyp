const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

// point to the template folder/file
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve(`${__dirname}/`),
    defaultLayout: false,
  },
  viewPath: path.resolve(`${__dirname}/`),
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "azracare.ai@gmail.com", // generated ethereal user
    pass: "znhbjgsiduvnozts", // generated ethereal password
  },
});

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

const sendMail = ({ sendTo, context }) => {
  return transporter.sendMail({
    to: sendTo, // list of receivers
    subject: "Activate Your Account",
    from: "eventapp724@gmail.com",
    template: "email",
    context,
  });
};

const sendForgetPasswordMail = ({sendTo, context}) => {
  return transporter.sendMail({
    to: sendTo, // list of receivers
    subject: "Change your password",
    from: "eventapp724@gmail.com",
    template: "forget",
    context,
  });
}

module.exports = {sendMail, sendForgetPasswordMail};
