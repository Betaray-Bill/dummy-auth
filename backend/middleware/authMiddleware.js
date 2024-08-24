import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

// User must be authenticated
const protect = async (req, res, next) => {
    let token;
  
    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;
    console.log("TOKEN", token);
    if (token) {
      try {
        console.log(1)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        console.log(2)
        req.user = await User.findById(decoded.userId).select('-password');
        console.log(req.user)
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
};

export default protect;