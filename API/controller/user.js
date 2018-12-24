const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = {
    user_signup: (req, res, next) => {
        User.find({
                email: req.body.email
            })
            .then(result => {
                if (result.length >= 1) {
                    console.log(result);
                    return res.status(499).json({
                        message: "Email exist"
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const user = new User({
                                email: req.body.email,
                                password: hash
                            });
                            user.save()
                                .then((result) => {
                                    res.status(200).json({
                                        message: "User created"
                                    })
                                }).catch((err) => {
                                    res.status(500).json({
                                        error: err
                                    })
                                });
                        };
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    },
    user_login: (req, res, next) => {
        User.find({
                email: req.body.email
            })
            .then(result => {
                if (result.length < 1) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                bcrypt.compare(req.body.password, result[0].password, (err, pass) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth Failed"
                        })
                    }
                    if (pass) {
                        const token = jwt.sign({
                            email: result[0].email,
                            userId: result[0]._id
                        }, "Secret", {
                            expiresIn: "1h"
                        });
                        return res.status(200).json({
                            message: "Auth seuccessfully",
                            token: token
                        })
                    }
                    res.status(401).json({
                        message: "Auth Failed"
                    });
                })
            }).catch(err => {
                res.status(500).json({
                    message: err

                })
            })
    }
}