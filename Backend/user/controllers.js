const asyncHandler = require("express-async-handler");
const User = require("./model.js");
const generateToken = require("../utils/generateToken.js");
const { sendForgetPasswordMail } = require("../email");

//  @desc   :  Auth user /set token
//  @Route  :  POST /api/users/auth
//  @access :  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email or password missing!");
  }

  const user = await User.findOne({ email });

  if (user && user.type === "Vendor" && user.status !== "Accepted") {
    res.status(401);
    throw new Error("Vendor approval pending. Please wait for approval.");
  } else if (
    user &&
    user.type === "Vendor" &&
    user.status === "Accepted" &&
    (await user.matchPassword(password))
  ) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      vendor: user.vendor,
      photo: user?.photo || null,
    });
  } else if (
    user &&
    user.type === "Client" &&
    (await user.matchPassword(password))
  ) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      vendor: user.vendor,
      photo: user?.photo || null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  @desc   :  logout user
//  @Route  :  POST /users/logout
//  @access :  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout Sucessfully" });
});

//  @desc   :  Register user
//  @Route  :  POST /users
//  @access :  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    password,
    city,
    type,
    gender,
    number,
    vendor,
    account,
  } = req.body;
  const experience = req.file?.filename || null
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }


  const user = await User.create({
    email,
    firstname,
    lastname,
    password,
    city,
    type,
    experience,
    gender,
    number,
    vendor,
    account,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  @desc   :  Get user profile
//  @Route  :  GET /users/profile
//  @access :  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is coming from protect middleware
  const user = req.user;
  res.status(200).json(user);
});

//  @desc   :  Update USer Profile
//  @Route  :  PUT users/profile
//  @access :  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    // req.user is coming from the protect middleware
    const {
      email,
      firstname,
      lastname,
      password,
      city,
      type,
      gender,
      number,
      vendor,
      account
    } = req.body;
    const photo = req.files?.photo ? req.files?.photo[0]?.filename : null;
    const experience = req.files?.experience ? req.files?.experience[0]?.filename : null;
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstname = firstname || user.firstname;
      user.email = email || user.email;
      user.lastname = lastname || user.lastname;
      user.city = city || user.city;
      user.type = type || user.type;
      user.gender = gender || user.gender;
      user.number = number || user.number;
      user.vendor = vendor || user.vendor;
      user.experience = experience || user.experience;
      user.photo = photo || user.photo;
      user.account = account || user.account;
      user.experience = experience || user.experience;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        email: updatedUser.email,
        lastname: updatedUser.lastname,
        city: updatedUser.city,
        type: updatedUser.type,
        gender: updatedUser.gender,
        number: updatedUser.number,
        vendor: updatedUser.vendor,
        photo: updatedUser.photo,
        account: updatedUser.account,
        experience: updatedUser.experience,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } catch (error) {
    console.log(error.message)
  }

});

const forgetPassword = asyncHandler(async (req, res) => {
  const email = req.params.email;

  const isValidUser = await User.findOne({ email });

  if (!isValidUser) {
    res.status(404);
    throw new Error("User not found!");
  }

  await sendForgetPasswordMail({
    sendTo: email,
    context: {
      inviteLink: `http://localhost:3000/setpassword/${isValidUser._id}`,
    },
  });

  res.status(200).json("Email has been send.");
});

//  Exporting the routes
module.exports = {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  forgetPassword,
};
