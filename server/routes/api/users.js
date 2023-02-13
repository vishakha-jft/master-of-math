const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');//hashing the pasword before storing it to the database
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User')
// const {users,levels} = require('../../connections/connections')

//Pull the errors and isValid variables from our validateRegisterInput(req.body) function and check input validation

router.post('/register',(req,res) => {
    
    //form validation
    const {errors,isValid} = validateRegisterInput(req.body);//calls the function and destructures it into the following parameters
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email:'Email already exists'})
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
            //console.log(newUser);
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    const payload = {
                      email:user.email
                    };
                    jwt.sign(payload,
                      keys.secretOrKey,
                      {
                      expiresIn: 31556926,
                      algorithm:'HS384' 
                      },
                      (err,token) => {
                        if(err) return res.json(err);
                        else {
                          res.json({
                            success:true,
                            user,
                            token:"Bearer "+token
                          })
                        }
                      }
                    )
                  })
                  .catch(err => console.log(err));
              });
            });
        }
    })
})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;// Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }// Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            email: user.email
          };// Sign tokenname
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,// 1 year in seconds
              algorithm:'HS384' 
            },
            (err, token) => {
              res.json({
                success: true,
                user,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ password: "Password incorrect" });
        }
      });
    });
  });

module.exports = router;

// Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbGRpQGN2LmNvIiwiaWF0IjoxNTcwMDg0NDQyLCJleHAiOjE1NzAyNTcyNDJ9.p3NWtFbyQPCxMPz_XKCiPs10sW2akA3r-pUtVCuCnTOzcs1XDYSVkOR5ZZmEyVy1