const express = require('express');
const Finder = require('../models/bookmodel')
const read = require('../models/reader.model')
//const multer=require('multer')
const router = express.Router();







router.get('/', async (req, res) => {
    try {
        const loggedBooks = await Finder.find();
        res.json(loggedBooks)
        

       
    } catch (err) {
        res.json({ message: err });
    }
})

//find with book name
router.post('/bookname',async (req,res) => {
    var Bookname=req.body.name;
    var regex=new RegExp(req.body.name,'i');
    var result=Finder.find({name:regex});
    result.exec(function(err,data){
        var r=[];
        if(!err)
        {
         if(data && data.length && data.length>0)
         {
             data.forEach(user =>{
                 r.push(user);
             })
         }
        }
       // console.log(r);
        res.json(r);

    })
  /*  try{
        /*let book=await Finder.find({name:new Regex(Bookname)}).then(b =>{
            console.log(book);
         if(b) {
           console.log(b);
           res.json(b);
         }
         else {
             res.json ('book not found');
         }
        })*/
        

  /*  }catch(err)
    {
        res.json({message:err});
    }*/
})

//Find with special mongo document ID

router.get('/:id', async (req, res) => {
    try {
        const loggedBooks = await Finder.findById(req.params.id);
        res.json(loggedBooks)
    } catch (err) {
        res.json({ message: err });
    }
})

router.post('/', async (req, res) => {
   // console.log(req.file);
    const Book = new Finder({
        // _id: req.body._id,
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
       // bookimage:req.file.path,
        bookimage:req.body.bookimage,
        avg_rating: req.body.avg_rating,
        release_year: req.body.release_year,
        genre: req.body.genre,
        description: req.body.description,
        review: req.body.review
    });

    try {
        const savedBook = await Book.save();
        res.json(savedBook)
    } catch (err) {
        res.json({ message: err });
    }

})

//Delete with special mongo document ID

router.delete('/:id', async (req, res) => {
    try {
        const removedBook = await Finder.remove({ _id: req.params.id });
        res.json(removedBook)
    } catch (err) {
        res.json({ message: err });
    }
})

//Update with special mongo document ID


router.patch('/:id', async (req, res) => {
    try {
        const book = await Finder.updateOne(
            { _id: req.params.id },
            {
                $set: {

                    name: req.body.name,
                    author: req.body.author,
                    publisher: req.body.publisher,
                   // bookimage:req.file.path,
                    bookimage:req.body.bookimage,
                    avg_rating: req.body.avg_rating,
                    release_year: req.body.release_year,
                    genre: req.body.genre,
                    description: req.body.description,
                    review: req.body.review

                }
            }
        );
        res.json(book)
    } catch (err) {
        res.json({ message: err });
    }
})

//update image
router.patch('/image/:id', async (req, res) => {
    try {
        const book = await Finder.updateOne(
            { _id: req.params.id },
            {
                $set: {
  
                    bookimage: req.body.bookimage,
  
                }
            }
        );
        res.json(book)
    } catch (err) {
        res.json({ message: err });
    }
  })




module.exports = router;