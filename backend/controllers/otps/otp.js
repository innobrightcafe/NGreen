const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createOtp, getOtp, confirmOtp } = require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyCarrierAndAdmin, verifyAdmin, verifyCarrierUserAndAdmin } = require('../../utils/auth')
const { body, validationResult } = require('express-validator');


const validateOTP = [
    body('order_id')
        .isString().withMessage('Order ID must be a string')
        .notEmpty().withMessage('Order ID is required')
];

const validatConfirmOTP = [
    body('order_id')
        .isString().withMessage('Order ID must be a string')
        .notEmpty().withMessage('Order ID is required'),
    body('otp')
        .isString().withMessage('otp must be a string')
        .notEmpty().withMessage('Otp is required'),
];


const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

router.route('/').post(verifyUser, validateOTP, handleValidation, createOtp),
router.route('/:order_id/orders').get(verifyUser, getOtp)
router.route('/confirm').post(verifyCarrier, validatConfirmOTP, handleValidation, confirmOtp)



module.exports = router;

