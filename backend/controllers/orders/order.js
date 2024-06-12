const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createOrder, getOrders, getOrder, updateOrder }= require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyCarrierAndAdmin, verifyAdmin, verifyCarrierUserAndAdmin } = require('../../utils/auth')
const { body, validationResult } = require('express-validator');


const validateOrder = [
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

router.route('/').post(verifyUser,validateOrder, handleValidation, createOrder).get(verifyCarrierUserAndAdmin,getOrders)
router.route('/:id').get(verifyCarrierUserAndAdmin,  getOrder).put(verifyUser, validateOrder, handleValidation, updateOrder);
// router.route('/:id/approve').put(approveTransaction)


module.exports = router;

