const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createRating, getRating, getRatings, updateRating } = require('./controller')
const { body, validationResult } = require('express-validator');


const validateRate = [
    body('user_id')
        .isString().withMessage('User ID must be a string')
        .notEmpty().withMessage('User ID is required'),
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

router.route('/').post(validateRate, handleValidation, createRating).get(getRatings)
router.route('/:id').get(getRating).put(updateRating);
// router.route('/:id/approve').put(approveRating)


module.exports = router;

