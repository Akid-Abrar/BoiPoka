const express= require('express');
const Finder = require('../models/studentmodel')

const router=express.Router();

router.get('/' , async (req,res) =>{
    try{
        const loggedStudents=await Finder.find();
        res.json(loggedStudents)
    }catch(err)
    {
        res.json({message : err});
    }
})

//Find with special mongo document ID

router.get('/:postId' , async (req,res) =>{
    try{
        const loggedStudents=await Finder.findById(req.params.postId);
        res.json(loggedStudents)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.post('/' , async (req,res) =>{
    const Student = new Finder({
        name : req.body.name,
        id : req.body.id,
        department : req.body.department,
        level : req.body.level,
        term : req.body.term,
        hall : req.body.hall,
        dues : req.body.dues
    });

    try{
        const savedStudent=await Student.save();
        res.json(savedStudent)
    }catch(err)
    {
        res.json({message : err});
    }

})

//Delete with special mongo document ID

router.delete('/:postId' , async (req,res) =>{
    try{
        const removedStudent=await Finder.remove({_id : req.params.postId});
        res.json(removedStudent)
    }catch(err)
    {
        res.json({message : err});
    }
})

//Update with special mongo document ID


router.patch('/:postId' , async (req,res) =>{
    try{
        const removedStudent=await Finder.updateOne(
            {_id : req.params.postId} ,
            {$set: {
                Result:{
                    Cgpa : req.body.Result.Cgpa,
                    CreditHour : req.body.Result.CreditHour,
            }}}
        );
        res.json(removedStudent)
    }catch(err)
    {
        res.json({message : err});
    }
})




module.exports= router;