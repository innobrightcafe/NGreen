const expressAsyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

exports.validate = handleValidation;
