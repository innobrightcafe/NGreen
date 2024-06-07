const router = require('express').Router()
const { createUser, getUsers, getUser, updateUser } = require('./controller')
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


router.route('/').get(getUsers).post(validateUser, handleValidation, createUser)
router.route('/:id').get(getUser).put(updateUser)

module.exports = router