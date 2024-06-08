const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createOrder, getOrders, getOrder, updateOrder }= require('./controller')
const { body, validationResult } = require('express-validator');


const validateOrder = [
    body('user_id')
        .isString().withMessage('User ID must be a string')
        .notEmpty().withMessage('User ID is required'),
    body('amount')
        .isDecimal({ decimal_digits: '0,2' }).withMessage('Amount must be a decimal number with up to two decimal places')
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
];


const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

router.route('/').post(validateOrder, handleValidation, createOrder).get(getOrders)
router.route('/:id').get(getOrder).put(validateOrder, handleValidation, updateOrder);
// router.route('/:id/approve').put(approveTransaction)


module.exports = router;

