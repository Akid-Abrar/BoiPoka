const router = require('express').Router();
let Reader = require('../models/reader.model');

router.route('/').get((req, res) => {
  Reader.find()
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password=req.body.password;
  const is_author=req.body.is_author;
  const friends=req.body.friends;
  const following=req.body.following;
  const books_read=req.body.books_read;
  const wishlist=req.body.wishlist;
  const reviews=req.body.reviews;
  const posts=req.body.posts;
  

  const newReader = new Reader({
    _id,
    first_name,
    last_name,
    password,
    is_author,
    friends,
    following,
    books_read,
    wishlist,
    reviews,
    posts,
  });

  newReader.save()
  .then(() => res.json('reader added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Reader.findById(req.params.id)
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
 Reader.findByIdAndDelete(req.params.id)
    .then(() => res.json('reader deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Reader.findById(req.params.id)
    .then(reader => {
     reader._id = req.body._id;
    reader.first_name=req.body.first_name;
    reader.last_name=req.body.last_name;
    reader.password=req.body.password;
    reader.is_author=req.body.is_author;
    reader.friends=req.body.friends;
    reader.following=req.body.following;
    reader.books_read=req.body.books_read;
    reader.wishlist=req.body.wishlist;
    reader.reviews=req.body.reviews;
    reader.posts=req.body.posts;

      reader.save()
        .then(() => res.json('reader updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;