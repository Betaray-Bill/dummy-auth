import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

// User must be authenticated
const protect = async(req, res, next) => {
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

const isAdminValidation = async(req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.refresh_token;
    console.log("TOKEN", token);

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        console.log(2)
        req.user = await User.findById(decoded.userId).select('-password');

        console.log(req.user.isAdmin);
        if (req.user.isAdmin) {
            console.log("Admin authenticated");
            next()
        }
    }
}

const verifyUser = async(req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        if (renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ valid: false })
            } else {
                req.email = decoded.email
                next();
            }
        })
    }
}


const renewToken = (req, res) => {
    const refresh_token = req.cookie?.refresh_token
    let exist = false;
    console.log("Refresh Token in Renew function", refresh_token)
    if (!refresh_token) {
        return res.json({ valid: false, message: "No refresh Token" })
    } else {
        jwt.verify(refresh_token, process.env.JWT_SECRET_KEY_REFRESH, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Refresh Token expired" })
            } else {
                exist = true;
                const access_token = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1m' });
                res.cookie('access_token', access_token, { maxAge: 60000, httpOnly: true });
                return true;
            }
        })
    }
    return exist
}

export { protect, isAdminValidation, verifyUser };