const express = require('express');
const Finder = require('../models/postmodel')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Finder.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/:Id', async (req, res) => {
    try {
        const posts = await Finder.findById(req.params.Id);
        res.json(posts)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/creatorid/:Id', async (req, res) => {

    try {
        const posts = await Finder.find({ creatorid: req.params.Id });
        res.json(posts)
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const NewPost = new Finder({

        // _id:req.body._id,
        type: req.body.type,
        like: req.body.like,
        bookid: req.body.bookid,
        creatorid: req.body.creatorid,
        content: req.body.content,
        rating: req.body.rating,
        date: req.body.date,
        comments: req.body.comments,
        approved: req.body.approved
    });

    try {
        const savedPost = await NewPost.save();
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err });
    }

})

router.delete('/:Id', async (req, res) => {
    try {
        const removedPost = await Finder.remove({ _id: req.params.Id });
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err });
    }
})


router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Finder.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    content: req.body.content,
                }
            }
        );
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err });
    }
})

router.patch('/addcomment/:id', async (req, res) => {
    try {
        Finder.find({ _id: req.params.id }, 'comments -_id', function (err, someValue) {
            if (err) return next(err);
            console.log(someValue);
        });
        Finder.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { comments: req.body.comments } },
            function (error, success) {
                if (error) {
                    console.log(error);
                    res.json('error')
                } else {
                    console.log(success);
                    res.json("success")
                }
            });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

router.patch('/like/:postId', async (req, res) => {
    try {
        const updatedPost = await Finder.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    like: req.body.like,
                }
            }
        );
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err });
    }
})


module.exports = router;
