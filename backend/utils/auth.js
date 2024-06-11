const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Carrier = require('../models/carrierModel');
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('./password')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('./formatter.js');

const AuthenticateUser = expressAsyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ "error": "No email or password for authentication" })
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({ "error": "No such email" })
    }
    user = format(user)
    const compare = await comparePassword(user.password, req.body.password)
    if (!compare) {
        return res.status(401).json({ "error": "Incorrect pasword" })
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
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ "error": "No email or password for authentication" })
    }
    let carrier = await Carrier.findOne({ email: req.body.email })
    if (!carrier) {
        return res.status(401).json({ "error": "No such email" })
    }
    carrier = format(carrier)
    const compare = await comparePassword(carrier.password, req.body.password)
    if (!compare) {
        return res.status(401).json({ "error": "Incorrect password" })
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
        const admin = jwt.verify(token, process.env.SECRET_KEY);
        if (admin.admin.type !== 'admin') {
            return res.status(403).json({ error: "Forbidden: You have no authoeity to perform this actions" });
        }
        req.authAdmin = admin.admin;
        req.user_id = admin.admin.id;
        req.user_type = 'admin';
        next();
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
        if (carrier.carrier.type !== 'carrier') {
            return res.status(403).json({ error: "Forbidden: You have no authoeity to perform this actions" });
        }
        req.authCarrier = carrier.carrier;
        req.user_id = carrier.carrier.id;
        req.user_type = 'carrier';
        console.log(req.carrier_id)
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
        if (admin.admin.type !== 'admin') {
            try {
                const carrier = jwt.verify(token, process.env.SECRET_KEY);
                if (carrier.carrier.type !== 'carrier') {
                    return res.status(403).json({ error: "Forbidden: You have no authoeity to perform this actions" });
                }
                req.authCarrier = carrier.carrier;
                req.carrier_id = carrier.carrier.id;
                req.user_type = 'carrier';
                console.log(req.carrier_id)
                next();
            } catch (error) {
                console.log(error.name + ' ' + error.message);
                return res.status(401).json({ error: "Unauthorized: Invalid Token" });
            }
            req.authAdmin = admin.admin;
            req.user_id = admin.admin.id;
            req.user_type = 'admin';
            next();
        }
    } catch (error) {

        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
})

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
        const admin = jwt.verify(token, process.env.SECRET_KEY);
        if (admin.admin.type !== 'admin' || admin.admin.type !== 'user') {
            try {
                const carrier = jwt.verify(token, process.env.SECRET_KEY);
                if (carrier.carrier.type !== 'carrier') {
                    return res.status(403).json({ error: "Forbidden: You have no authoeity to perform this actions" });
                }
                req.authCarrier = carrier.carrier;
                req.user_id = carrier.carrier.id;
                req.user_type = 'carrier';
                console.log(req.carrier_id)
                next();
            } catch (error) {
                console.log(error.name + ' ' + error.message);
                return res.status(401).json({ error: "Unauthorized: Invalid Token" });
            }
            req.authAdmin = admin.admin;
            req.user_id = admin.admin.id;
            req.user_type = admin.admin.type;
            next();
        }
    } catch (error) {

        console.log(error.name + ' ' + error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
})


module.exports = { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierAndAdmin, verifyCarrierUserAndAdmin }
