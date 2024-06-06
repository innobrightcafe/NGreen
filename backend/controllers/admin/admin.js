const router = require('express').Router()
const { createAdmin, getAdmins, getAdmin, updateAdmin }= require('./controller')
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

  const handleValidation = expressAsyncHandler( async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });


router.route('/').get(getAdmins).post(validateUser, handleValidation, createAdmin)
router.route('/:id').get(getAdmin).put(updateAdmin)

module.exports = router