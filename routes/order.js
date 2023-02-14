const Router = require('express')
const userOp = require('../controllers/users.js');
const router = Router();
const authByToken = require('../middlewares/auth.js')
const orders = require('../controllers/orders.js')

router.post('/add-order', authByToken, async (req, res) => {
    try {
        const newOrder = await orders.addOrder(req.body, req.user);
        return res.status(200).send(newOrder)
    }
    catch (err) {
        return res.status(404).json({
            errors: {
                body: [err.message],
            },
        });
    }
})

router.get('/get-orders', authByToken, async (req, res) => {
    try {
        const allOrders = await orders.getOrder(req.body, req.user);
        return res.status(200).send(allOrders)
    }
    catch (err) {
        return res.status(404).json({
            errors: {
                body: [err.message],
            },
        });
    }
})

module.exports = router;