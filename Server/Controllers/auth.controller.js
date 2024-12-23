import User from "../Models/user.models.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from "../utils/error.js";


dotenv.config();
export const signup = async (req, res, next)=>{
  // destructuring username, email and password from body
  const {username , email , password} = req.body;
  const result = await User.findOne({
    $or: [
      { email: email },
      { username: username }
    ]
  });
  if (result) return next(errorHandler(404, 'User all ready registered'));
  // Hashing password 
  const hashedPassword = bcryptjs.hashSync(password,10);
  console.log(username,email,password);
  const newUser = new User({username, email, password:hashedPassword});
  try{
      await newUser.save();
      res.status(201).json('User created successfully');
  }
  catch (error){
   next(error);
  }

};

export const signin = async (req, res, next)=>{
  // destructuring email and password from body
    const {email , password} = req.body;
    try{
      // Fetch user by email
      const vaildUser = await User.findOne({ email });
      if (!vaildUser) return next(errorHandler(404, 'User not found'));

      // compare Provided password with stored hashed password
      const validPassword = bcryptjs.compareSync(password, vaildUser.password);
      if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));

      //  generating token 
      const token = jwt.sign({ id: vaildUser._id}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = vaildUser._doc;
    res
    .cookie('access_token', token, {httpOnly: true})
    .status(200)
    .json(rest);
    }
    catch (error) {
      next(error);
    }

};