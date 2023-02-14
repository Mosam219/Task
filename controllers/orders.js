const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
module.exports['addOrder'] = addOrder = async (order, user) => {
    try {
        if (!order.subTotal) {
            throw new Error("please add all fields");
        }
        const savedUser = await User.findOne({ email: user.email })
        const newOrder = new Order({
            userId: savedUser._id,
            subTotal: order.subTotal,
            phoneNo: savedUser.phoneNo,
        })
        const savedOrder = await newOrder.save()
        return savedOrder;
    }
    catch (e) {
        throw new Error(e)
    }
}

module.exports['getOrder'] = getOrder = async (user) => {
    try {
        return await Order.find({ email: user.email })
    }
    catch (e) {
        throw new Error(e)
    }
}