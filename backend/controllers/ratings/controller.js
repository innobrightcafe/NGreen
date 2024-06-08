const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const Rating = require('../../models/rateModel.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createRating = expressAsyncHandler( async(req,res)=> {
    const user = format(await User.findById(req.body.user_id))
    if(!req.body.rating) {
        return res.status(400).json({"error": "rating id needed"})
    }
    if (!user.id) {
        return res.status(400).json({"error": "User not found"})
    }
    const carrier = format(await Carrier.findById(req.body.carier_id))
    if(!carrier.id){
        return res.status(400).json({"error": "Carrier not found"})
    }
    const ratings = await Rating.find({carrier_id: carrier.id});
    const len = ratings.length;
    const newRating = (carrier.rating * len + req.body.rating)/(len + 1)
    await Carrier.findByIdAndUpdate(carrier.id, { $set: {rating: newRating} }, { new: true })
    const rating = Rating.create({ user_id: req.body.user_id, carrier_id: req.body.carrier_id, rating: req.body.rating})
    return res.status(201).json(format(rating))
})

const getRatings = expressAsyncHandler( async (req, res) => {
    let ratings = await Rating.find()
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
        return res.status(400).json({"error": "rating id needed"})
    }
    const ratings = await Rating.find({carrier_id: rating.carrier_id});
    const len = ratings.length;
    const newRating = (carrier.rating * len + req.body.rating - rating.rating)/(len)
    await Carrier.findByIdAndUpdate(rating.carrier_id, { $set: {rating: newRating} }, { new: true })
    await Rating.findByIdAndUpdate(rating.id, { $set: {rating: req.body.rating} }, { new: true })
    const rate = Ratinf.findById(freq.params.id)
    return res.status(201).json(format(rate))
})


module.exports = { createRating, getRating, getRatings, updateRating }