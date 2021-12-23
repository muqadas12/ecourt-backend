const HttpError=require("../models/http-error");
const {validationResult}=require("express-validator");
const User=require("../models/User-model");
const uuid=require("uuid");

const Dummy_user=[
    {
        id:"u1",
        name:"Muqaddas",
        email:"ms@gmail.com",
        password:"m123"


    }
]

const getUserById=(req,res,next)=>{
    res.json(Dummy_user);

}

const SignUp=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { name, email, password,  } = req.body;
  
    let existingUser
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUser = new User({
      name,
      email,
      image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
      password,
     
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({user: createdUser.toObject({ getters: true })});

}

const Login=async(req,res,next)=>{
    const { email, password } = req.body;

    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser || existingUser.password !== password) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    res.json({message: 'Logged in!'});

}

exports.getUserById=getUserById;
exports.SignUp=SignUp;
exports.Login=Login;;