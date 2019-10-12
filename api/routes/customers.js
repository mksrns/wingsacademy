const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuth = require('../middlewares/check-adminAuth');
const CustomersController = require('../controllers/customers');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

//Fetch all customer
router.get('/', checkAdminAuth, CustomersController.customers_get_all);

//Fetch Individual Customer
router.get('/:customerId', checkAdminAuth, CustomersController.customers_get_customer);

//Insert customer
router.post('/', checkAdminAuth, upload.single('customerImage'), CustomersController.customers_create_customer);

//Update Customer
router.patch('/:customerId', checkAdminAuth, CustomersController.customers_update_customer);

//Delete Customer
router.delete('/:customerId', checkAdminAuth, CustomersController.customers_delete_customer);

module.exports = router;