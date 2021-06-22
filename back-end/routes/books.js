const express = require('express');
const Finder = require('../models/bookmodel')
const read = require('../models/reader.model')
const multer=require('multer')
const router = express.Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
cb(null,'upload/');
    },
    filename: function(req,file,cb){
cb(null, file.originalname);
    }
});

const fileFilter=(req,file,cb) => {
//reject a file
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);

}else {
    cb(null,false);
}
};

const upload=multer({storage:storage,
fileFilter:fileFilter
});

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
    try{
        let book=await Finder.findOne({name:new RegExp('^'+Bookname+'$', "i")}).then(b =>{
         if(b) {
           console.log(b);
           res.json(b);
         }
         else {
             res.json ('book not found');
         }
        })
        

    }catch(err)
    {
        res.json({message:err});
    }
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

router.post('/',upload.single('bookimage'), async (req, res) => {
    console.log(req.file);
    const Book = new Finder({
        // _id: req.body._id,
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
        bookimage:req.file.path,
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




module.exports = router;