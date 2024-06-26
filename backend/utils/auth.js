const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Carrier = require('../models/carrierModel');
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('./password')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('./formatter.js');
const { cache } = require('./cache')
const { sendEmail } = require('./mailer.js')

const AuthenticateUser = expressAsyncHandler(async (req, res) => {
    if (!cache.get('google') && !req.body.otp) {
        return res.status(401).json({ "error": "No OTP provided" })
    }
    let user = ''
    if (req.body.otp) {
        let value = cache.get(req.body.otp)
        if (!value) {
            return res.status(401).json({ "error": "OTP expired or incorrect otp" })
        }
        value = JSON.parse(value)
        cache.del(req.body.otp)
        user = await User.findOne({ email: value.email })
        if (!user) {
            return res.status(401).json({ "error": "No such email" })
        }
        user = format(user)
        if (user.password != value.password) {
            return res.status(401).json({ "error": "Incorrect pasword" })
        }
    } else if (cache.get('google')) {
        user = await User.findOne({ email: req.query.email })
        if (!user) {
            return res.status(401).json({ "error": "This Email has not been sign up with google" })
        }
        cache.del('google')
    }
    jwt.sign({ user }, process.env.SECRET_KEY, (error, token) => {
        if (error) {
            return res.status(401).json({ "error": `${error.name}+ ${error.message}` })
        }
        res.json({
            token,
            user
        })
    })
})

const AuthenticateCarrier = expressAsyncHandler(async (req, res) => {
    if (!cache.get('google') && !req.body.otp) {
        return res.status(401).json({ "error": "No OTP provided" })
    }
    let carrier = ''
    if (req.body.otp) {
        let value = cache.get(req.body.otp)
        if (!value) {
            return res.status(401).json({ "error": "OTP expired or incorrect otp" })
        }
        value = JSON.parse(value)
        cache.del(req.body.otp)
        let carrier = await Carrier.findOne({ email: value.email })
        if (!carrier) {
            return res.status(401).json({ "error": "No such email" })
        }
        carrier = format(carrier)
        if (carrier.password != value.password) {
            return res.status(401).json({ "error": "Incorrect password" })
        }
    } else if (cache.get('google')) {
        carrier = await Carrier.findOne({ email: req.query.email })
        if (!carrier) {
            return res.status(401).json({ "error": "This Email has not been sign up with google" })
        }
        cache.del('google')
    }
    jwt.sign({ carrier }, process.env.SECRET_KEY, (error, token) => {
        if (error) {
            return res.status(401).json({ "error": `${error.name}+ ${error.message}` })
        }
        res.json({
            token,
            carrier
        })
    })
})

const verifyUser = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ error: "Forbidden: No Authorization Header" });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(403).json({ error: "Forbidden: Invalid Authorization Format" });
    }

    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "Forbidden: No Token Provided" });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        if (!user.user.email) {
            return res.status(403).json({ error: "Forbidden: Authentication Failed" });
        }
        req.authUser = user.user;
        req.user_id = user.user.id;
        req.user_type = 'user';
        next();
    } catch (error) {
        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
};

const verifyAdmin = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ error: "Forbidden: No Authorization Header" });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(403).json({ error: "Forbidden: Invalid Authorization Format" });
    }

    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "Forbidden: No Token Provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.user && decodedToken.user.type === 'admin') {
            req.authUser = decodedToken.user;
            req.user_id = decodedToken.user.id;
            req.user_type = 'admin';
            next();
        } else {
            return res.status(403).json({ error: "Forbidden: You have no authority to perform this action" });
        }
    } catch (error) {
        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
};


const verifyCarrier = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ error: "Forbidden: No Authorization Header" });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(403).json({ error: "Forbidden: Invalid Authorization Format" });
    }

    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "Forbidden: No Token Provided" });
    }

    try {
        const carrier = jwt.verify(token, process.env.SECRET_KEY);
        if (!carrier.carrier) {
            return res.status(403).json({ error: "Forbidden: You have no authoeity to perform this actions" });
        }
        req.authUser = carrier.carrier;
        req.user_id = carrier.carrier.id;
        req.user_type = 'carrier';
        next();
    } catch (error) {
        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

}

const verifyCarrierAndAdmin = expressAsyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ error: "Forbidden: No Authorization Header" });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(403).json({ error: "Forbidden: Invalid Authorization Format" });
    }

    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "Forbidden: No Token Provided" });
    }

    try {
        const admin = jwt.verify(token, process.env.SECRET_KEY);
        if (admin.user) {
            if (admin.user.type === 'admin') {
                req.authUser = admin.user;
                req.user_id = admin.user.id;
                req.user_type = 'admin';
            } else {
                return res.status(403).json({ error: "Forbidden: You do not have authority to perform this action" });
            }
        } else if (admin.carrier) {
            req.authUser = admin.carrier;
            req.user_id = admin.carrier.id;
            req.user_type = 'carrier';
        } else {
            return res.status(403).json({ error: "Forbidden: You do not have authority to perform this action" });
        }
        next();
    } catch (error) {
        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
});



const verifyCarrierUserAndAdmin = expressAsyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ error: "Forbidden: No Authorization Header" });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(403).json({ error: "Forbidden: Invalid Authorization Format" });
    }

    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "Forbidden: No Token Provided" });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        if (payload.user) {
            req.authUser = payload.user;
            req.user_id = payload.user.id;
            req.user_type = payload.user.type;
        } else if (payload.carrier) {
            req.authUser = payload.carrier;
            req.user_id = payload.carrier.id;
            req.user_type = 'carrier';
        } else {
            return res.status(403).json({ error: "Forbidden: You do not have authority to perform this action" });
        }

        next();
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
});


module.exports = { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierAndAdmin, verifyCarrierUserAndAdmin }
