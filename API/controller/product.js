const Product = require('../model/product');

module.exports = {
    product_getAll: (req, res, next) => {
        Product.find()
            .then(result => {
                const response = {
                    message: "List all of product",
                    data: result.map(product => {
                        return {
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            productImage: product.productImage,
                            request: {
                                method: 'GET',
                                href: '/product/' + product._id,
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: err
                });
            })
    },
    product_getById :  (req, res, next) => {
        const id = req.params.productId;
        Product.findById(id)
            .then(result => {
                if (result) {
                    const response = {
                        message: "Product detail",
                        data: {
                            _id: result._id,
                            name: result.name,
                            price: result.price,
                        }
                    };
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: "Product not found"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            });
    },
    product_createProduct :  (req, res, next) => {
        console.log(req.file);
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
        product.save()
            .then((result) => {
                const response = {
                    message: "Created product successfully",
                    data: {
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            method: 'GET',
                            href: '/product/' + result._id
                        }
                    }
                };
                res.status(201).json(response);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: err
                });
            });
    },
    product_updateProduct :  (req, res, next) => {
        const id = req.params.productId;
        Product.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        }).then(result => {
            if (result) {
                const response = {
                    message: "Product has been update",
                    data: {
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            method: 'GET',
                            href: '/product/' + result._id
                        }
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "Product not found",
                })
            };
        }).catch(err => {
            res.status(500).json({
                message: err
            })
        });
    },
    product_deleteProduct :  (req, res, next) => {
        const id = req.params.productId;
        Product.findByIdAndRemove({
                _id: id
            })
            .then(result => {
                if (result) {
                    const response = {
                        message: "Deleted product successfully",
                        request: {
                            method: 'POST',
                            href: '/product',
                            body: {
                                name: 'String',
                                price: 'Number'
                            }
                        }
                    };
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: "Product not found",
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                });
            })
    }
}