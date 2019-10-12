const Customer = require('../models/customer');

exports.customers_get_all = (req, res, next) => {
    Customer.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    customer: result.map(res => {
                        return {
                            name: { 
                                firstname: res.name.firstname,
                                lastname: res.name.lastname
                            },
                            username: res.username,
                            customerImage: res.customerImage,
                            id:res._id,
                            contactInfo: {
                                address:{
                                    email: res.contactInfo.email,
                                    street: res.contactInfo.address.street,
                                    city: res.contactInfo.address.city,
                                    state: res.contactInfo.address.state,
                                    pincode: res.contactInfo.address.pincode
                                },
                                email:res.contactInfo.email,
                                telephone:{
                                    tel1: res.contactInfo.telephone
                                }
                            },
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/customers/' + res._id
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

exports.customers_get_customer = (req, res, next) => {
    Customer.findById(req.params.customerId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    customer: result,
                    request: {
                        type: 'GET',
                        description: 'Get all customers',
                        url: "http://localhost:8080/customers/"
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

exports.customers_create_customer = (req, res, next) => {
    console.log(req.file);
    const customer = new Customer({
        name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        //customerImage: req.file.path,
        username: req.body.username,
        password: req.body.password,
        created_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    });
    customer.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add customer', error: err});
        } else {
            res.status(201).json({
                message: "Customers added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/customers/" + result._id
                }
            });
        }
    });
}

exports.customers_update_customer = (req, res, next) => {
    
    var customer = {
        name:{
            firstname:req.body.firstname,
            lastname:req.body.lastname
        },
        username: req.body.username,
        password: req.body.password,
        updated_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    };

    Customer.findByIdAndUpdate({_id:req.params.customerId}, customer, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/customers/" + result._id
                }
            });
        }
    });
    // console.log(updateOps);
}

exports.customers_delete_customer = (req, res, next) => {
    Customer.remove({_id:req.params.customerId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'Customer deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/customers/'
                }
            });
        }
    });
}