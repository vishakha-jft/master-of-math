const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const validateForgotInput = require('../../validation/forgot');
const User = require('../../models/User')


router.post("/check", (req, res) => {
    const { errors, isValid } = validateForgotInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }// Check password
      else{
         const token = crypto.randomBytes(20).toString('hex');
          User.updateMany({email: email}, {$set:{resetToken : token,
            resetTokenTime: (Date.now() + 720000)}}, function(err,user){});
          
          const s = {
            to_email: email,
          };
          res.status(200).send(s)
        }
      });
});

module.exports = router;