const router = require('express').Router()
const { createWallet, getWallets, getWallet } = require('./controller')

router.route('/').get(getWallets).post(createWallet)
router.route('/:id').get(getWallet)

module.exports = router