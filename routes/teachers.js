const express= require('express');
const Finder = require('../models/teachermodel')

const router=express.Router();

router.get('/' , async (req,res) =>{
    try{
        const techers=await Finder.find();
        res.json(techers)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.get('/:postId' , async (req,res) =>{
    try{
        const techers=await Finder.findById(req.params.postId);
        res.json(techers)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.post('/' , async (req,res) =>{
    const Teacher = new Finder({
        name : req.body.name,
        t_id : req.body.t_id,
        dept : req.body.dept
    });

    try{
        const savedTeacher=await Teacher.save();
        res.json(savedTeacher)
    }catch(err)
    {
        res.json({message : err});
    }

})

router.patch('/:postId' , async (req,res) =>{
    try{
        const removedTeacher=await Finder.updateOne(
            {_id : req.params.postId} ,
            {$set: {
                t_id : req.body.t_id
                }
            }
        );
        res.json(removedTeacher)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.delete('/:postId' , async (req,res) =>{
    try{
        const removedTeacher=await Finder.remove({_id : req.params.postId});
        res.json(removedTeacher)
    }catch(err)
    {
        res.json({message : err});
    }
})


module.exports= router;