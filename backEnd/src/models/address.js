const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    isDefault: { type: Boolean, default: false },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Address', address);