const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    bankCode: { type: String },
    transactionNo: { type: String, required: true },
    responseCode: { type: String, required: true },
    transactionStatus: { type: String, required: true },
    payDate: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    additionalInfo: { type: Map, of: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Payment", payment);