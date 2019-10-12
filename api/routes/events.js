const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuth = require('../middlewares/check-adminAuth');
const EventsController = require('../controllers/events');

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

//Fetch all event
router.get('/', EventsController.events_get_all);

//Fetch Individual event
router.get('/:eventId', EventsController.events_get_event);

//Insert event
router.post('/', checkAdminAuth, upload.single('eventImage'), EventsController.events_create_event);

//Update event
router.patch('/:eventId', checkAdminAuth, upload.single('eventImage'), EventsController.events_update_event);

//Delete event
router.delete('/:eventId', checkAdminAuth, EventsController.events_delete_event);

module.exports = router;