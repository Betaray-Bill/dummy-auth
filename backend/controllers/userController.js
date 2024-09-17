import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("LOGINNN")  
    console.log(req.body)
    const user = await User.findOne({ email:email });

    if (user && (await user.matchPassword(password))) {
        // const token = await generateToken(res, user._id);
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET_KEY,{
            expiresIn:'1m'
        });
        const refreshtoken = jwt.sign({ id:user._id }, process.env.JWT_SECRET_KEY_REfresh,{
            expiresIn:'1m'
        });

        res.cookie('access_token',token, {maxAge: 60000})
        res.cookie('refresh_token',refreshtoken, {maxAge: 2592000, httpOnly:true, secure:true, sameSite:'strict'})


        await res.status(200).json({
            isLogin: true,
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token, refreshtoken
        });
    } else {
        res.status(401).json({status:401, isLogin:false, valid:false});
        throw new Error('Invalid email or password');
    }
}

// REGISTER
const register = async (req, res) => {
    console.log("REGISTER")
    const { name, email, password, isAdmin } = req.body;

    try{
        const userExists = await User.findOne({ email});

        if(userExists){
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, isAdmin });
        await user.save();
        if(user){
            generateToken(res, user._id);
        }

        res.status(201).json({ message: 'User registered successfully', user });
    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Erroes"});
    }
}


// SignOut - GET - /signout
const signout = async(req, res) => {
    res.clearCookie('jwt').status(200).json('Signout success!');
}

const suma = async(req, res) => {
    res.status(200).json({ message: "Mrooow"});
}


export {
    login,
    register,
    signout,
    suma
}