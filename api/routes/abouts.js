const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../middlewares/check-adminAuth');
const AboutsController = require('../controllers/abouts');

//Fetch all about
router.get('/', AboutsController.abouts_get_all);

//Fetch Individual about
// router.get('/:aboutId', checkAdminAuth, AboutsController.abouts_get_about);

//Insert about
router.post('/', checkAdminAuth, AboutsController.abouts_create_about);

//Update about
router.patch('/:aboutId', checkAdminAuth, AboutsController.abouts_update_about);

//Delete about
router.delete('/:aboutId', checkAdminAuth, AboutsController.abouts_delete_about);

module.exports = router;