const SuperAdmin = require('../models/superAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

exports.superAdmin_signup = (req, res, next) => {
    SuperAdmin.find({username: req.body.username}, (err, result) => {
        if(result.length >= 1){
            return res.status(409).json({
                message: "username exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const superAdmin = new SuperAdmin({
                        name: {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        },
                        username: req.body.username,
                        password: hash
                    });
                    superAdmin.save((err, result) => {
                        if(err){
                            res.status(500).json({msg: 'Failed to create superAdmin', error: err});
                        } else {
                            res.status(201).json({
                                message: "superAdmin added Successfully",
                                createdData: result
                            });
                        }
                    });
                }
            })
        }
    });
}

exports.superAdmin_login = (req, res, next) => {
    SuperAdmin.find({username: req.body.username}, (err, result) => {
        if(err){
            res.status(500).json({
                error: err
            });
        } else {
            if(result.length < 1){
                return res.status(401).json({
                    message: "Auth Failed"
                });
            } 
            bcrypt.compare(req.body.password, result[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                } 
                if(result){
                    const token = jwt.sign({
                        username: result.username,
                        Id: result._id
                    },
                    config.superAdminSecret, 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: "Auth successfull",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
        }
    });
}

exports.superAdmin_delete = (req, res, next) => {
    SuperAdmin.remove({_id: req.params.superAdminId}, (err, result) => {
        if(err){
            res.status(500).json({
                message: "error deleting superAdmin",
                error: err
            });
        } else {
            res.status(200).json({
                message: "SuperAdmin Deleted"
            });
        }
    });
}