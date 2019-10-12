const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkSuperAdminAuth = require('../middlewares/check-superAdminAuth');
const AdminController = require('../controllers/admins');

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

//Fetch all admin
router.get('/', checkSuperAdminAuth, AdminController.admins_get_all);

//Fetch Individual admin
router.get('/:adminId', checkSuperAdminAuth, AdminController.admins_get_admin);

//Insert admin
router.post('/', checkSuperAdminAuth, 
// upload.single('adminImage'), 
AdminController.admins_create_admin);

//login
router.post('/login', AdminController.admin_login);

//Update admin
router.patch('/:adminId', checkSuperAdminAuth, AdminController.admins_update_admin);

//Delete admin
router.delete('/:adminId', checkSuperAdminAuth, AdminController.admins_delete_admin);

module.exports = router;