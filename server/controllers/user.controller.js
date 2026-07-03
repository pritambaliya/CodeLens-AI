import User from "../model/user.model.js";
import cloudinary from "../config/cloudanary.config.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Account
const updateProfile = async (req, res) => {

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    let updateData = {
      name:req.body.name,
      email:req.body.email
    };

    if(req.file){
      if(user.avatar?.public_id){

        await cloudinary.uploader.destroy(
          user.avatar.public_id
        );
      }

      updateData.avatar = {
        public_id:req.file.filename,
        url:req.file.path
      };
    }

    if(req.body.removeProfileImage === "true"){

      if(user.avatar?.public_id){
        await cloudinary.uploader.destroy(
          user.avatar.public_id
        );
      }

      updateData.avatar = {
        public_id:"",
        url:""
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new:true
      }
    );

    res.json({
      message:"Profile updated",
      user:updatedUser
    });

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    res.json({
      message: "Account deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Display Account
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { registerUser, updateProfile, deleteAccount, getProfile }