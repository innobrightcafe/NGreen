const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createOtp, getOtp, confirmOtp } = require('./controller')
const { body, validationResult } = require('express-validator');


const validateOTP = [
    body('user_id')
        .isString().withMessage('User ID must be a string')
        .notEmpty().withMessage('User ID is required'),
    body('carrier_id')
        .isString().withMessage('Carrier ID must be a string')
        .notEmpty().withMessage('Carrier ID is required'),
    body('order_id')
        .isString().withMessage('Order ID must be a string')
        .notEmpty().withMessage('Order ID is required')
];

const validatConfirmeOTP = [
    body('user_id')
        .isString().withMessage('User ID must be a string')
        .notEmpty().withMessage('User ID is required'),
    body('carrier_id')
        .isString().withMessage('Carrier ID must be a string')
        .notEmpty().withMessage('Carrier ID is required'),
    body('order_id')
        .isString().withMessage('Order ID must be a string')
        .notEmpty().withMessage('Order ID is required'),
    body('otp')
        .isInt().withMessage('otp must be a number')
        .notEmpty().withMessage('Wallet ID is required'),
];


const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

router.route('/').post(validateOTP, handleValidation, createOtp),
router.route('/:order_id/orders').get(getOtp)
router.route('/confirm').post(validatConfirmeOTP, handleValidation, confirmOtp)



module.exports = router;

