//auth controler
import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


export const registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      //console.log(hashPassword);
      const newUser = new User({ name, email, password: hashPassword, role });
      await newUser.save();
      res
        .status(200)
        .json({ message: "User Registered Successfully", data: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //login user || signin
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
  
      const token = jwt.sign({ _id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.token = token;
      await user.save();
      res
        .status(200)
        .json({ message: "User Logged In Successfully", token: token, id: user._id, role: user.role, name: user.name });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // forgot password
  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const transporter = nodemailer.createTransport({
        //Gmail or yahoo or outlook
        service: "Gmail",
        auth: {
          user: process.env.PASS_MAIL,
          pass: process.env.PASS_KEY,
        },
      });
      const mailOptions = {
        from: process.env.PASS_MAIL,
        to: user.email,
        subject: "Password Reset Link",
        text: `You are receiving this because you have requested the reset of the password for your account 
        Please click the following link or paste it into your browser to complete the process
        http://localhost:5173/reset-password/${user._id}/${token}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Internal server error in sending the mail" });
        } else {
          res.status(200).json({ message: "Email Sent Successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.findByIdAndUpdate({ _id: id }, { password: hash })
              .then((ele) => res.send({ status: "Success" }))
              .catch((err) => res.send({ status: err }));
          })
          .catch((err) => res.send({ status: err }));
      }
    });
  };
