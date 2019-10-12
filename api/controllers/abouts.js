const About = require('../models/about');

exports.abouts_get_all = (req, res, next) => {
    About.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    about: result.map(res => {
                        return {
                            id: res._id,
                            title: res.title,
                            para1: res.content.para1,
                            para2: res.content.para2,
                            para3: res.content.para3,
                            created_at:res.created_at,
                            updated_at:res.updated_at
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

// exports.abouts_get_about = (req, res, next) => {
//     About.findById(req.params.aboutId, function(err, result){
//         if(err){
//             res.status(500).json({error: err});
//         } else {
//             if(result){
//                 res.status(200).json({
//                     about: result
//                 });
//             } else {
//                 res.status(404).json({
//                     message: 'No Entries found'
//                 });
//             }            
//         }
//     });
// }

exports.abouts_create_about = (req, res, next) => {
    const about = new About({
        title: req.body.title,
        content: {
            para1: req.body.para1,
            para2: req.body.para2,
            para3: req.body.para3
        },
        created_at: new Date()
    });
    about.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add about', error: err});
        } else {
            res.status(201).json({
                message: "Abouts added Successfully",
                createdData: result
            });
        }
    });
}

exports.abouts_update_about = (req, res, next) => {
    
    var about = {
        title: req.body.title,
        content: {
            para1: req.body.para1,
            para2: req.body.para2,
            para3: req.body.para3
        },
        updated_at: new Date(),
    };

    About.findByIdAndUpdate({_id:req.params.aboutId}, about, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'About updated'
            });
        }
    });
}

exports.abouts_delete_about = (req, res, next) => {
    About.remove({_id:req.params.aboutId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'about deleted'
            });
        }
    });
}