const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")

// @desc user signup route
// @route POST /signup
// @access public

const signupRoute = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;

    // check all fields are okay

    if(!username || !email || !password) {
        res.status(400);
        return next(new Error("All fields are required"));
    }

    // check if user exist with same name

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        res.status(400);
        return next(new Error("User already exists with this username"));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        res.status(400);
        return next(new Error("User already exists with this email"));
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // now create a user with this hashed password
    const newUser = await User.create({username, email, password: hashedPassword});

    // if the user didn't got created due to any error
    if(!newUser) {
        res.status(400);
        return next(new Error("There is some problem in creating new user!!, try after sometime."))
    }

    res.status(200).json({message: "Registered successfully!"});
})


// @desc user login route
// @route POST /login
// @access public

const loginRoute = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;

    // check if all fields are okay

    if(!username || !password) {
        res.status(400);
        return next(new Error("All fields are required"));
    }

    // check user exists and also password is correct or not

    const user = await User.findOne({username});

    if(!user) {
        res.status(404);
        return next(new Error("Invalid username!"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
        res.status(400);
        return next(new Error("wrong password!"));
    }

    // create long and short token

    const refreshToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            userId: user._id
        }
        }, process.env.REFRESH_SECRET,
        {expiresIn: "7d"}
    );

    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            userId: user._id
        }
        }, process.env.ACCESS_SECRET,
        {expiresIn: "10s"}
    );

    // res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     secure: process.env.NODE_ENV === "production"
    // });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days in miliseconds
    }).status(200).json({token: accessToken, user: {
        username: user.username,
        userId: user._id,
        email: user.email
    }})
})

//@desc route to refresh access token
//@route POST /refresh
//@access public
const tokenRefreshRoute = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    let user;

   try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        user = decode.user;
        const accessToken = jwt.sign({user}, process.env.ACCESS_SECRET, {expiresIn: "10s"});
        res.status(200).json({ token: accessToken, user });
   } catch (error) {
        res.status(401);
        return next(new Error("Not authorized, login again!"));
   }

})

module.exports = {signupRoute, loginRoute, tokenRefreshRoute}
