import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(res, user._id);
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

}

const register = async (req, res) => {
    console.log("REGISTER")
    const { name, email, password, isAdmin } = req.body;

    try{
        const userExists = await User.findOne({ email: email});

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