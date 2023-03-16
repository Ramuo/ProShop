import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


//@desc     Auth user & get token (LOGIN)
//@route    POST /api/users/login 
//@access   Public
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // Find user by email
    const user = await User.findOne({email});

    //Validate user
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    //Check if user and password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
});

//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    // 1 Validate all fields
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // 2 Find user by email
    const userExist = await User.findOne({email});

    // 3 Check if user exist
    if(userExist){
        res.status(400)
        throw new Error('User exist already')
    }

    // 4 To create new user
    const user = await User.create({
        name,
        email,
        password
    })

    // 5 Once user created, then set it into db
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('Invalide user data')
    }


});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        //Let's check if a password wos sent
        if(req.body.password){
            user.password = req.body.password
        }

        //Let's save the updated changes
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }

});    


// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}