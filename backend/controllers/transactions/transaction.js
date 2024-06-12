const router = require('express').Router()
const expressAsyncHandler = require('express-async-handler');
const { createTransaction, getTransaction, getTransactions, approveTransaction  } = require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierUserAndAdmin }  = require('../../utils/auth')
const { body, validationResult } = require('express-validator');


const validateTransaction = [
    body('number')
        .isInt().withMessage('Wallet number must be a number')
        .notEmpty().withMessage('Wallet ID is required'),
    body('amount')
        .isDecimal({ decimal_digits: '0,2' }).withMessage('Amount must be a decimal number with up to two decimal places')
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('type')
        .isIn(['credit', 'debit']).withMessage('Transaction type must be either credit or debit')
];

const handleValidation = expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

router.route('/').post(verifyCarrierUserAndAdmin, validateTransaction, handleValidation, createTransaction).get(getTransactions)
router.route('/:id').get(verifyCarrierUserAndAdmin, getTransaction)
router.route('/:id/approve').put(verifyAdmin, approveTransaction)


module.exports = router;

