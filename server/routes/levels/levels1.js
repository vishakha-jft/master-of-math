const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
const CategoriesSchema = require('../../models/Categories');
CategoriesSchema.plugin(random);
const token = require('../../token/token');


const Addition = mongoose.model("addition",CategoriesSchema);
const Subtraction = mongoose.model('subtraction',CategoriesSchema);
const Division = mongoose.model('divisions',CategoriesSchema);
const Multiplication = mongoose.model('multiplications',CategoriesSchema);
const Modulos = mongoose.model('modulos',CategoriesSchema);

router.get('/addition',token.auth, (req,res)=> {
    Addition.find((err,questions) => {
        if(err) console.log(err);
        console.log("in addition",questions);
        var quesMap = {};
        questions.forEach(function(question){
            quesMap[question._id] = question;
        });
        res.send(quesMap);
    }).limit(5)
})

router.post('/addition', token.auth,async (req, res) => {
    const newAddition = await Addition.create(req.body)
    if(!newAddition){
        return res.status(400).json({
            msg: "Error",
        })
    }
    return res.json(newAddition);
})
router.get('/subtraction',token.auth, (req,res)=> {
    Subtraction.find((err,questions) => {
        if(err) console.log(err);
        console.log("in subtraction",questions);
        var quesMap = {};
        questions.forEach(function(question){
            quesMap[question._id] = question;
        });
        res.send(quesMap);
    }).limit(5)
})
router.get('/multiplication',token.auth, (req,res)=> {
    Multiplication.find((err,questions) => {
        if(err) console.log(err);
        console.log("in Multiplication",questions);
        var quesMap = {};
        questions.forEach(function(question){
            quesMap[question._id] = question;
        });
        res.send(quesMap);
    }).limit(5)
})
router.get('/division',token.auth, (req,res)=> {
    Division.find((err,questions) => {
        if(err) console.log(err);
        console.log("in division",questions);
        var quesMap = {};
        questions.forEach(function(question){
            quesMap[question._id] = question;
        });
        res.send(quesMap);
    }).limit(5)
})
router.get('/modulos',token.auth, (req,res)=> {
    Modulos.find((err,questions) => {
        if(err) console.log(err);
        console.log("in division",questions);
        var quesMap = {};
        questions.forEach(function(question){
            quesMap[question._id] = question;
        });
        res.send(quesMap);
    }).limit(5)
})
router.post('/modulos', token.auth,async (req, res) => {
    const newAddition = await Modulos.create(req.body)
    if(!newAddition){
        return res.status(400).json({
            msg: "Error",
        })  
    }
    return res.json(newAddition);
})
module.exports = router;