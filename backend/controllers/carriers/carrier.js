const router = require('express').Router()
const { createCarrier, getCarriers, getCarrier, updateCarrier, approveCarrier } = require('./controller')
const expressAsyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyCarrierAndAdmin, verifyAdmin, verifyCarrierUserAndAdmin } = require('../../utils/auth')


const validateCarrier = [
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('account_name')
        .isString().withMessage('Account name  must be a string')
        .notEmpty().withMessage('Account name  is required'),
    body('account_bank')
        .isString().withMessage('Account bank  must be a string')
        .notEmpty().withMessage('Axxount bank  is required'),
    body('account_number')
        .isInt().withMessage('Account number must be an Integer')
        .notEmpty().withMessage('Axxount number is required'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain a number'),
    body('pnumber')
        .isMobilePhone().withMessage('Invalid phone number')
];

const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});


router.route('/').get(verifyCarrierUserAndAdmin, getCarriers).post(validateCarrier, handleValidation, createCarrier)
router.route('/:id').get(verifyCarrierUserAndAdmin, getCarrier).put(verifyCarrierAndAdmin, updateCarrier)
router.route('/:id/approve').put(verifyAdmin, approveCarrier)

module.exports = router