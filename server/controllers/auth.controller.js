  import User from "../model/user.model.js";
  import jwt from "jsonwebtoken";


  // Generate Token
  const generateToken = (id)=>{
  return jwt.sign(
      {id},
      process.env.JWT_SECRET,
      {
        expiresIn:"7d"
      }
  );
  };

  // Login User
  const login = async(req,res)=>{
  try{
    const {email,password}=req.body;

    const user = await User
      .findOne({email})
      .select("+password");

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.status(401).json({
        message:"Invalid password"
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
  });



    res.json({
      message:"Login successful",
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }

    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });
  }
  };

  // Logout User
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

  export {login, logout};