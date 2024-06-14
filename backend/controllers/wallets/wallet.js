const router = require('express').Router()
const { createWallet, getWallets, getWalletByAdmin, getWalletByUser} = require('./controller')
const { AuthenticateUser, verifyUser, AuthenticateCarrier, verifyCarrier, verifyCarrierAndAdmin, verifyAdmin, verifyCarrierUserAndAdmin } = require('../../utils/auth')



router.route('/').get(verifyAdmin, getWallets).post(verifyAdmin, createWallet)
router.route('/:id/users').get(verifyAdmin, getWalletByAdmin)
router.route('/current').get(verifyCarrierUserAndAdmin, getWalletByUser)

module.exports = router