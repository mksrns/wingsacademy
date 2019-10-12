const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAdminAuth = require('../middlewares/check-adminAuth');
const StoriesController = require('../controllers/stories');

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

//Fetch all story
// router.get('/', StoriesController.stories_get_all);

//Fetch Individual story
// router.get('/:storyId', StoriesController.stories_get_story);

//Insert story
router.post('/', checkAdminAuth, upload.array('storyImages'), StoriesController.stories_create_story);

//Update story
// router.patch('/:storyId', checkAdminAuth, upload.single('storyImage'), StoriesController.stories_update_story);

//Delete story
// router.delete('/:storyId', checkAdminAuth, StoriesController.stories_delete_story);

module.exports = router;