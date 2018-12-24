const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');
const orderController = require('../controller/order');
const router = express.Router();

router.get('/', jwtAuth, orderController.order_getAll);

router.get('/:orderId', jwtAuth, orderController.order_getById);

router.post('/', jwtAuth, orderController.order_createOrder);

router.delete('/:orderId', jwtAuth, orderController.order_deleteOrder);


// router.patch('/:orderId', (req, res, next) => {
//     res.status(200).json({
//         message: "Update order"
//     })
// });

module.exports = router;