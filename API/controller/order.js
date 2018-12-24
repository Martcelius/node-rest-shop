const Order = require('../model/order');
const Product = require('../model/product');

module.exports = {
    order_getAll: (req, res, next) => {
        Order.find()
            .populate('productId', 'name')
            .exec()
            .then(result => {
                const response = {
                    message: "All list of order",
                    data: result.map(order => {
                        return {
                            _id: order._id,
                            productId: order.productId,
                            quantity: order.quantity,
                            request: {
                                method: 'GET',
                                href: '/order/' + order._id,
                            }
                        }
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
    },

    order_getById: (req, res, next) => {
        Order.findById({
                _id: req.params.orderId
            })
            .populate('productId')
            .exec()
            .then(result => {
                if (!result) {
                    res.status(404).json({
                        message: "Order not found"
                    })
                }
                const response = {
                    message: "List of order",
                    data: {
                        _id: result._id,
                        productId: result.productId,
                        quantity: result.quantity,
                        request: {
                            method: 'GET',
                            href: '/order'
                        }
                    }
                };
                res.status(201).json(response);
            })
            .catch((err) => {
                res.status(500).json({
                    message: err,
                });
            });
    },

    order_createOrder: (req, res, next) => {
        Product.findById({
                _id: req.body.productId
            })
            .exec()
            .then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Product not found"
                    })
                }
                const order = new Order({
                    productId: req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save()
            })
            .then((result) => {
                const response = {
                    message: "Created order successfully",
                    data: {
                        _id: result._id,
                        productId: result.productId,
                        quantity: result.quantity,
                        request: {
                            method: 'GET',
                            href: '/order/' + result._id,
                        }
                    }
                };
                res.status(201).json(response);
            }).catch((err) => {
                res.status(500).json({
                    message: "Created order Failed",
                });
            });
    },

    order_deleteOrder: (req, res, next) => {
        Order.findByIdAndDelete({
                _id: req.params.orderId
            })
            .exec()
            .then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Order not found"
                    })
                }
                const response = {
                    message: "Order has benn delete",
                    request: {
                        method: 'POST',
                        href: '/order'
                    }
                }
                res.status(200).json(response);
            }).catch(err => {
                res.status(500).json({
                    message: err
                })
            });
    }
}