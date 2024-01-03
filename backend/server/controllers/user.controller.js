import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: true 
}

const register =async (req, res,next) => {
    const { fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return next (new AppError('All fields are required', 400));
    }

    const userExists =await User.findOne({email});

    if(userExists) {
        return next (new AppError('user alredy exists', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://www.pexels.com/search/beautiful/'
        }
    });
    if(!user) {
        return next (new AppError('user registration failed, please try again', 400));
    }
    if(req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity: 'faces',
                crop: 'fill'
            });
            if (result) {
                
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 500)
            )
        }
    }

   await user.save();

        user.password = undefined;
        const token = await user.generateJWTToken();
        console.log(token)
        res.cookie('token', token, cookieOptions);
    

    res.status(201).json({
        sucess:true,
        message: 'User registered successfully',
        user,
    })
};

const login =async (req, res,next) => {
    try {
        console.log(req.body)
        const {email, password} = req.body;

        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }
        const user = await User.findOne({
            email
        }).select('+password');
    
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('email or password does not match', 400));
        }
        user.password = undefined;
        console.log(user)
        const token = await user.generateJWTToken();
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
            sucess: true,
            message: 'User loggedin sucessfully',
            user,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
    
};

const logout = (req, res) => {
    res.cookie('token', null, {
        sucess: true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        sucess: true,
        message: 'user logged out sucessfully'
    })
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId)
    
        res.status(200).json({
            sucess:true,
            message: 'User details',
            user
        }) 
    } catch (e) {
        return next(new AppError('Failed to fetch profile', 400));
    }
    
};

const forggotPassword = async (req, res) => {
    const {email} = req.body

    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({email});
    if (!user) {
        return next(new AppError('User does not exist', 400));
    }

    const resetToken = await user.generatePasswordResetToken();
}

const resetpassword = () => {

}

export{
    register,
    login,
    logout,
    getProfile,
    forggotPassword,
    resetpassword
}