const express = require('express');
const Finder = require('../models/bookmodel')
const read = require('../models/reader.model')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const loggedBooks = await Finder.find();
        res.json(loggedBooks)
        
const book=await Finder.find({_id:{$in:await read.find({first_name:"Akid"},{_id:0}).toArray()[0].wishlist}},
{name:1 , author:1})
console.log(book)
       
    } catch (err) {
        res.json({ message: err });
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

router.post('/', async (req, res) => {
    const Book = new Finder({
        // _id: req.body._id,
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
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
        const book = await Finder.update(
            { _id: req.params.id },
            {
                $set: {

                    name: req.body.name,
                    author: req.body.author,
                    publisher: req.body.publisher,
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