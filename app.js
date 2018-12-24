const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ProductRoute = require('./API/route/product');
const OrderRoute = require('./API/route/order');
const UserRoute = require('./API/route/user');


const app = express();

// connect mongoDB
mongoose.connect("mongodb://localhost:27017/API-shop", {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CORS without package npm cors and enable for all endpoint
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTION') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});

//Route group for product and order
app.use('/product', ProductRoute);
app.use('/order', OrderRoute);
app.use('/user', UserRoute);


//error if route above not run or not any execute
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;