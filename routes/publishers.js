const router = require('express').Router();
let Publisher = require('../models/publisher.model');

router.route('/').get((req, res) => {
  Publisher.find()
    .then(publishers => res.json(publishers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  const books = req.body.books;
  

  const newPublisher = new Publisher({
    _id,
    name,
    books,
  });

  newPublisher.save()
  .then(() => res.json('publisher added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Publisher.findById(req.params.id)
    .then(publisher => res.json(publisher))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
 Publisher.findByIdAndDelete(req.params.id)
    .then(() => res.json('publisher deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Publisher.findById(req.params.id)
    .then(publisher => {
      publisher._id = req.body._id;
      publisher.name=req.body.name;
      publisher.books=req.body.books;

      publisher.save()
        .then(() => res.json('publisher updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;