const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: Object,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
});

mongoose.model('Order', orderSchema);