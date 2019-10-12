const Story = require('../models/story');

// exports.events_get_all = (req, res, next) => {
//     Event.find(function(err, result){
//         if(err){
//             res.status(500).json({error: err});
//         } else {
//             if(result.length >= 1){
//                 res.status(200).json({
//                     count: result.length,
//                     event: result.map(res => {
//                         return {
//                             title: res.title,
//                             description: res.description,
//                             to: res.to,
//                             from: res.from,
//                             eventImage: res.eventImage,
//                             id:res._id,
//                             created_at:res.created_at,
//                             updated_at:res.updated_at,
//                             request: {
//                                 type: 'GET',
//                                 URL: 'http://localhost:8080/events/' + res._id
//                             }
//                         }
//                     })
//                 });
//             } else {
//                 res.status(404).json({
//                     message: 'No Entries found'
//                 });
//             }            
//         }
//     });
// }

// exports.events_get_event = (req, res, next) => {
//     Event.findById(req.params.eventId, function(err, result){
//         if(err){
//             res.status(500).json({error: err});
//         } else {
//             if(result){
//                 res.status(200).json({
//                     event: result,
//                     request: {
//                         type: 'GET',
//                         description: 'Get all events',
//                         url: "http://localhost:8080/events/"
//                     }
//                 });
//             } else {
//                 res.status(404).json({
//                     message: 'No Entries found'
//                 });
//             }            
//         }
//     });
// }

exports.stories_create_story = (req, res, next) => {
    // const files = req.files;
    // if(!files){
    //     const error = new Error('No file');
    //     error.httpStatusCode = 400;
    //     return next(error);
    // }
    // res.send({status: 'ok'});
    // for(i=0;i<5;i++){
    //     console.log(req.files[i].path);
    // }
    var stories = [];
    for(let i=0;i<req.files.length;i++){
       stories[i] = req.files[i].path;
    }
    
    console.log(stories);
    console.log(req.files.length);
    
    const story = new Story({
        storyTitle: req.body.storyTitle,
        created_at: new Date()
    }); 
    story.storyImages = stories; 

    story.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add story', error: err});
        } else {
            res.status(201).json({
                message: "stories added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/stories/" + result._id
                }
            });
        }
    });
}

// exports.events_update_event = (req, res, next) => {
    
//     var event = {
//         title: req.body.title,
//         description: req.body.description,
//         to: req.body.to,
//         from: req.body.from,
//         eventImage: req.file.path,
//         updated_at: new Date()
//     };

//     Event.findByIdAndUpdate({_id:req.params.eventId}, event, {new:true}, function(err, result){
//         if(err){ 
//             res.status(500).json({error: err});
//         } else {
//             res.status(200).json({
//                 message: 'Event updated',
//                 request: {
//                     type: 'GET',
//                     url: "http://localhost:8080/events/" + result._id
//                 }
//             });
//         }
//     });
// }

// exports.events_delete_event = (req, res, next) => {
//     Event.remove({_id:req.params.eventId}, function(err, result){
//         if(err){
//             res.status(500).json({error: err});
//         } else {
//             res.status(200).json({
//                 message: 'event deleted',
//                 request: { 
//                     type: 'POST',
//                     url: 'http://localhost:8080/events/'
//                 }
//             });
//         }
//     });
// }