const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createRating, getRating, getRatings, updateRating } = require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyCarrierAndAdmin, verifyAdmin, verifyCarrierUserAndAdmin } = require('../../utils/auth')
const { body, validationResult } = require('express-validator');


const validateRate = [
    body('carrier_id')
        .isString().withMessage('Carrier ID must be a string')
        .notEmpty().withMessage('Carrier ID is required'),
    body('order_id')
        .isString().withMessage('Order ID must be a string')
        .notEmpty().withMessage('Order ID is required'),
    body('rating')
        .isDecimal({ decimal_digits: '0,1' }).withMessage('Rating must be a decimal number with up to one decimal places')
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
];


const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

router.route('/').post(verifyUser, validateRate, handleValidation, createRating).get(verifyCarrierUserAndAdmin, getRatings)
router.route('/:id').get(verifyCarrierUserAndAdmin, getRating).put(verifyUser, updateRating);


module.exports = router;

