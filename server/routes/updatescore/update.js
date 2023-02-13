const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const token = require('../../token/token');
const User = require('../../models/User')


router.post('/upscore', token.auth_user, (req,res)=> {
    console.log(req.body);
    // const inpLevel = req.body.level;
    User.findOneAndUpdate({ email: req.body.email }, {$set:{[req.body.level]:req.body.score}}, {new: true}, (err,user) => {
        if(err) return res.json(err);
        else res.json(user);
    });
})

module.exports = router;