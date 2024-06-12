const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const Rating = require('../../models/rateModel.js')
const Order = require('../../models/orderModel.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createRating = expressAsyncHandler( async(req,res)=> {
    const user_id = req.user_id
    const user = format(await User.findById(user_id))
    if (!user.id) {
        return res.status(403).json({"error": "User not AUTHORIZED"})
    }
    const order = format(await Order.findById(req.body.order_id))
    if(!order.id) {
        return res.status(400).json({"error": " Order not found"})
    }
    if(!req.body.rating) {
        return res.status(400).json({"error": "rating must be in the request body"})
    }
    const carrier_id = order.carrier_id
    const carrier = format(await Carrier.findById(order.carrier_id))
    if(!carrier.id){
        return res.status(400).json({"error": "Carrier not found"})
    }
    const ratings = await Rating.find({carrier_id: carrier.id});
    const len = ratings.length;
    const newRating = (carrier.rating * len + req.body.rating)/(len + 1)
    await Carrier.findByIdAndUpdate(carrier.id, { $set: {rating: newRating} }, { new: true })
    const rating = Rating.create({ user_id, order_id:req.body.order_id, carrier_id, rating: req.body.rating})
    return res.status(201).json(format(rating))
})

const getRatings = expressAsyncHandler( async (req, res) => {
    let ratings = await Rating.find().sort({createdAt: -1});
    ratings = ratings.map( rating => format(rating));
    return res.status(200).json(ratings)
})

const getRating = expressAsyncHandler( async (req, res) => {
    const rating = await Rating.findById(req.params.id)
    if (!rating) {
        return res.status(400).json({"error": "Rating cannot be found"})
    }
    return res.json(format(rating))
})

const updateRating = expressAsyncHandler( async(req, res) => {
    const rating = format(await Rating.findById(req.params.id))
    if (!rating.id) {
        res.status(400).json({"error": "Rating cannot be found"})
    }
    if(!req.body.rating) {
        return res.status(400).json({"error": "rating must be in the request body"})
    }
    const carrier = format(await Carrier.findById(rating.carrier_id))
    const ratings = await Rating.find({carrier_id: rating.carrier_id});
    const len = ratings.length;
    const newRating = (carrier.rating * len + req.body.rating - rating.rating)/(len)
    await Carrier.findByIdAndUpdate(rating.carrier_id, { $set: {rating: newRating} }, { new: true })
    await Rating.findByIdAndUpdate(rating.id, { $set: {rating: req.body.rating} }, { new: true })
    const rate = Rating.findById(req.params.id)
    return res.status(201).json(format(rate))
})


module.exports = { createRating, getRating, getRatings, updateRating }