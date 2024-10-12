const UserModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const httpsStatusCode = require("../constants/httpsStatusCode");
const { getToken } = require("../middleware/authMiddleware");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "User not created",
      });
    }
    return res.status(httpsStatusCode.CREATED).json({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Something went wrong", 
      error: error.message,
    });
  }
};

// User Login

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "User not found",
            });
        }
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(httpsStatusCode.BAD_REQUEST).json({
                status: false,
                message: "Invalid password or email",
            });
        }
        if(isValidPassword){
            const token = await getToken(user);
            return res.status(httpsStatusCode.OK).json({
                status: true,
                message: "User logged in successfully",
                data: {user, token}
                
            });
        }else{
            return res.status(httpsStatusCode.UNAUTHORIZED).json({
                status: false,
                message: "Invalid password or email",
            });
        }
        
    }
    catch (error) {
        return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message,
        });
    }
}

const logout = async (req, res) => {
    return res.status(httpsStatusCode.OK).json({
        status: true,
        message: "User logged out successfully",
    });
}
module.exports = { register, login, logout };
