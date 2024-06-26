const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const Carrier = require('../../models/carrierModel')
const Rating = require('../../models/rateModel.js')
const Order = require('../../models/orderModel.js')
const { processMongoDBObject: format, reverseProcessMongoDBObject: reformat } = require('../../utils/formatter.js')


const createRating = expressAsyncHandler(async (req, res) => {

    const { rating, order_id } = req.body;
    const user_id = req.user_id;

    // Find and format the user
    const user = format(await User.findById(user_id));
    if (!user.id) {
        return res.status(403).json({ "error": "User not AUTHORIZED" });
    }

    // Find and format the order
    const order = format(await Order.findById(order_id));
    if (!order.id) {
        return res.status(400).json({ "error": "Order not found" });
    }

    const carrier_id = order.carrier_id;

    // Parse rating and ensure it is a number
    let rate = parseFloat(rating);
    if (isNaN(rate)) {
        return res.status(400).json({ "error": "Invalid rating value" });
    }

    // Find and format the carrier
    const carrier = format(await Carrier.findById(carrier_id));
    if (!carrier.id) {
        return res.status(400).json({ "error": "Carrier not found" });
    }

    // Calculate new average rating
    const ratings = await Rating.find({ carrier_id: carrier.id });
    const len = ratings.length;
    let newRating = (carrier.rating * len + rate) / (len + 1);
    newRating = newRating.toString();
    rate = rate.toString();
    // Update carrier rating
    await Carrier.findByIdAndUpdate(carrier.id, { $set: { rating: newRating } }, { new: true });

    // Create a new rating record
    const newRatingRecord = await Rating.create({ user_id, order_id, carrier_id, rating: rate });

    // Respond with the created rating
    return res.status(201).json(format(newRatingRecord));
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
    let ratin = parseFloat(req.body.rating)
    let newRating = (parseFloat(carrier.rating) * len + ratin - parseFloat(rating.rating))/(len)
    newRating = newRating.toString()
    ratin = ratin.toString()
    await Carrier.findByIdAndUpdate(rating.carrier_id, { $set: {rating: newRating} }, { new: true })
    await Rating.findByIdAndUpdate(rating.id, { $set: {rating: ratin }}, { new: true })
    const rate = await Rating.findById(req.params.id)
    return res.status(201).json(format(rate))
})


module.exports = { createRating, getRating, getRatings, updateRating }