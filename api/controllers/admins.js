const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

exports.admins_get_all = (req, res, next) => {
    Admin.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    admin: result.map(res => {
                        return {
                            name: { 
                                firstname: res.name.firstname,
                                lastname: res.name.lastname
                            },
                            username: res.username,
                            role: res.role,
                            // adminImage: res.adminImage,
                            id:res._id,
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/admins/' + res._id
                            }
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

exports.admins_get_admin = (req, res, next) => {
    Admin.findById(req.params.adminId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    admin: result,
                    request: {
                        type: 'GET',
                        description: 'Get all admins',
                        url: "http://localhost:8080/admins/"
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.admins_create_admin = (req, res, next) => {
    Admin.find({username: req.body.username}, (err, result) => {
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
                    const admin = new Admin({
                        name: {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        },
                        //adminImage: req.file.path,
                        username: req.body.username,
                        password: hash,
                        role: req.body.role,
                        created_at: new Date(),
                    });
                    admin.save((err,result) => {
                        if(err){
                            res.status(500).json({msg: 'Failed to add admin', error: err});
                        } else {
                            res.status(201).json({
                                message: "admin added Successfully",
                                createdData: result,
                                request: {
                                    type: 'GET',
                                    url: "http://localhost:8080/admins/" + result._id
                                }
                            });
                        }
                    });
                }
            })
        }
    });
}

exports.admin_login = (req, res, next) => {
    Admin.find({username: req.body.username}, (err, result) => {
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
                    config.adminSecret, 
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

exports.admins_update_admin = (req, res, next) => {
    
    var admin = {
        name:{
            firstname:req.body.firstname,
            lastname:req.body.lastname
        },
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        updated_at: new Date()
    };
    Admin.findByIdAndUpdate({_id:req.params.adminId}, admin, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'admin updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/admins/" + result._id
                }
            });
        }
    });
}

exports.admins_delete_admin = (req, res, next) => {
    Admin.remove({_id:req.params.adminId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'admin deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/admins/'
                }
            });
        }
    });
}