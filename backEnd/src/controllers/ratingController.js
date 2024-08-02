const Ratings = require("../models/comment");

const createRating = async (req, res) => {
    try {
        const variant_id = req.query.variant_id;
        const { rating, content, user_id } = req.body;

        if (!rating || !content || !user_id) {
            return res.status(400).json({ status: false, message: "Please fill in all fields" });
        }

        const getRating = await Ratings.findOne({ variant_id }).sort({ page: -1 });

        if (!getRating) {
            const newRating = new Ratings({
                variant_id,
                page: 1,
                count: 1,
                comments: [{ user_id, rating, content }]
            });
            await newRating.save();
            return res.status(200).json({ status: true, message: "Rating created successfully" });
        }

        if (getRating.comments.length < 10) {
            getRating.comments.push({ user_id, rating, content });
            getRating.count += 1;
            await getRating.save();
            return res.status(200).json({ status: true, message: "Rating created successfully" });
        } else {
            const newRating = new Ratings({
                variant_id,
                page: getRating.page + 1,
                count: 1,
                comments: [{ user_id, rating, content }]
            });
            await newRating.save();
            return res.status(200).json({ status: true, message: "Rating created successfully" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports = { createRating }