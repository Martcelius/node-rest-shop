const express = require('express');
const multer = require('multer');
const jwtAuth = require('../middleware/jwtAuth');
const productController = require('../controller/product');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.get('/', productController.product_getAll);

router.get('/:productId', productController.product_getById);

router.post('/', jwtAuth, uploads.single('productImage'), productController.product_createProduct);

router.patch('/:productId', jwtAuth, productController.product_updateProduct);

router.delete('/:productId', jwtAuth, productController.product_deleteProduct);

module.exports = router;