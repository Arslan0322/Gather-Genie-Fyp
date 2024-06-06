const jwt = require("jsonwebtoken");

// Function to generate a JSON Web Token (JWT) and set it as a cookie in the response
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d" // Setting the token expiration time to 30 days
    });

    res.cookie('jwt', token);
};

module.exports = generateToken; // Exporting the generateToken function as the default export