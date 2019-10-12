const express = require('express');
const router = express.Router();
const SuperAdminController = require('../controllers/superAdmins');
const multer = require('multer');
const checkSuperAdminAuth = require('../middlewares/check-superAdminAuth');

router.post('/signup', SuperAdminController.superAdmin_signup);

router.post('/login', SuperAdminController.superAdmin_login);

router.delete('/:superAdminId', checkSuperAdminAuth, SuperAdminController.superAdmin_delete);

module.exports = router;