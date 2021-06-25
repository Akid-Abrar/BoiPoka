const express= require('express');
const Finder = require('../models/postmodel')

const router=express.Router();

router.get('/' , async (req,res) =>{
    try{
        const posts=await Finder.find();
        res.json(posts)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.get('/:Id' , async (req,res) =>{
    try{
        const posts=await Finder.findById(req.params.Id);
        res.json(posts)
    }catch(err)
    {
        res.json({message : err});
    }
})

router.get('/creatorid/:Id' , async (req,res) =>{
  
    try{
        const posts=await Finder.find({creatorid: req.params.Id});
        res.json(posts)
    }catch(err)
    {
        res.json({message : err});
    }
  });

router.post('/' , async (req,res) =>{
    const NewPost = new Finder({

        // _id:req.body._id,
        type:req.body.type,
        like:req.body.like,
        bookid:req.body.bookid,
        creatorid:req.body.creatorid,
        content:req.body.content,
        date:req.body.date,
        comments:req.body.comments,
        approved:req.body.approved
    });

    try{
        const savedPost=await NewPost.save();
        res.json(savedPost)
    }catch(err)
    {
        res.json({message : err});
    }

})

router.delete('/:Id' , async (req,res) =>{
    try{
        const removedPost=await Finder.remove({_id : req.params.Id});
        res.json(removedPost)
    }catch(err)
    {
        res.json({message : err});
    }
})


router.patch('/:postId' , async (req,res) =>{
    try{
        const updatedPost=await Finder.update(
            {_id : req.params.postId} ,
            {$set: {
                content : req.body.content,
                comments : req.body.comments,
                }
            }
        );
        res.json(updatedPost)
    }catch(err)
    {
        res.json({message : err});
    }
})

module.exports= router;
