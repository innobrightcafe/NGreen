const router = require('express').Router()
const { createUser, getUsers, getUser, updateUser  } = require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyAdmin, verifyCarrierUserAndAdmin }  = require('../../utils/auth')
const expressAsyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


const validateUser = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
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

// router.route('/test').get(testEmail)
router.route('/').get(verifyCarrierUserAndAdmin, getUsers).post(validateUser, handleValidation, createUser)
router.route('/:id').get(verifyCarrierUserAndAdmin, getUser).put(verifyUser, updateUser)


module.exports = router