const router = require('express').Router();
let Reader = require('../models/reader.model');


router.route('/').get(async (req, res) => {
  Reader.find()
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const _id = req.body._id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  // const password=req.body.password;
  const is_author = req.body.is_author;
  const friends = req.body.friends;
  const following = req.body.following;
  const books_read = req.body.books_read;
  const wishlist = req.body.wishlist;
  const reviews = req.body.reviews;
  const posts = req.body.posts;
  const author_id = req.body.author_id;
  const genre = req.body.genre;
  const image = req.body.image;


  const newReader = new Reader({
    //_id,
    first_name,
    last_name,
    email,
    // password,
    is_author,
    friends,
    following,
    books_read,
    wishlist,
    reviews,
    posts,
    author_id,
    genre,
    image
  });

  newReader.save()
    .then(() => res.json('reader added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//find reader by email
router.route('/email/:id').get((req, res) => {

  Reader.find({ email: req.params.id })
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {

  Reader.findById(req.params.id)
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});


// router.route('/email/:id').get((req, res) => {

//   Reader.find({email : req.params.id})
//     .then(reader => res.json(reader))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/findAuthorName/:authorId').get((req, res) => {

  Reader.find({ author_id: req.params.authorId })
    .then(reader => res.json(reader))
    .catch(err => res.status(400).json('Error: ' + err));
});
//find author by author_id
router.get('/author/:id', async (req, res) => {
  var author = req.params.id;
  try {
    let Author = await Reader.findOne({ author_id: author }).then(auth => {
      if (auth) {
        //console.log(auth);
        res.json(auth);
      }
      else {
        res.json("no such author");
      }
    })

  } catch (err) {
    res.json({ message: err });
  }
})

//find with author id  but post

router.get('/auth/:id', async (req, res) => {
  var author = req.params.id;
  try {
    Reader.findOne({ author_id: req.params.id }).then(b => {
      if (b) {
       // console.log(b);
        res.json(b);
      }
      else {
        res.json('author not found');
      }
    })


  } catch (err) {
    res.json({ message: err });
  }
})


router.route('/:id').delete((req, res) => {
  Reader.findByIdAndDelete(req.params.id)
    .then(() => res.json('reader deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Reader.findById(req.params.id)
    .then(reader => {
      //reader._id = req.body._id;
      reader.first_name = req.body.first_name;
      reader.last_name = req.body.last_name;
      reader.email = req.body.email;
      // reader.password=req.body.password;
      reader.is_author = req.body.is_author;
      reader.friends = req.body.friends;
      reader.following = req.body.following;
      reader.books_read = req.body.books_read;
      reader.wishlist = req.body.wishlist;
      reader.reviews = req.body.reviews;
      reader.posts = req.body.posts;
      reader.author_id = req.body.author_id;
      reader.image = req.body.image;

      reader.save()
        .then(() => res.json('reader updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.patch('/:id', async (req, res) => {
  try {
    const reader = await Reader.update(
      { _id: req.params.id },
      {
        $set: {

          image: req.body.image,


        }
      }
    );
    res.json(reader)
  } catch (err) {
    res.json({ message: err });
  }
})

// router.route('/update/:id').patch(async(req, res) => {
//   Reader.findById(req.params.id)
//     .then(reader => {
//       //reader._id = req.body._id;
//       reader.first_name = req.body.first_name;
//       reader.last_name = req.body.last_name;
//       reader.email = req.body.email;
//       // reader.password=req.body.password;
//       reader.is_author = req.body.is_author;
//       reader.friends = req.body.friends;
//       reader.following = req.body.following;
//       reader.books_read = req.body.books_read;
//       reader.wishlist = req.body.wishlist;
//       reader.reviews = req.body.reviews;
//       reader.posts = req.body.posts;
//       reader.author_id = req.body.author_id;

//       reader.save()
//         .then(() => res.json('reader updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/update/:id').patch(async (req, res) => {
  Reader.findById({
    _id: req.params.id
  }, function (err, docs) {
    if (err) { console.log("error!") }
    else {
      let first_name = req.body.first_name,
        last_name = req.body.last_name,
        email = req.body.email,
        is_author = req.body.is_author;
      friends = req.body.friends;
      following = req.body.following;
      books_read = req.body.books_read;
      wishlist = req.body.wishlist;
      reviews = req.body.reviews;
      posts = req.body.posts;
      author_id = req.body.author_id;
      if (first_name == null || first_name == '') {
        first_name = docs.first_name;
      }
      if (last_name == null || last_name == '') {
        last_name = docs.last_name;
      }
      if (email == null || email == '') {
        email = docs.email;
      }
      if (is_author == null || is_author == '') {
        is_author = docs.is_author;
      }
      if (friends == null || friends == '') {
        friends = docs.friends;
      }
      if (following == null || following == '') {
        following = docs.following;
      }
      if (books_read == null || books_read == '') {
        books_read = docs.books_read;
      }
      if (wishlist == null || wishlist == '') {
        wishlist = docs.wishlist;
      }
      if (reviews == null || reviews == '') {
        reviews = docs.reviews;
      }
      if (posts == null || posts == '') {
        posts = docs.posts;
      }
      if (author_id == null || author_id == '') {
        author_id = docs.author_id;
      }

      let options;

      options = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        is_author: is_author,
        friends: friends,
        following: following,
        books_read: books_read,
        wishlist: wishlist,
        reviews: reviews,
        posts: posts,
        author_id: author_id
      }
      Reader.updateOne({ _id: req.params.id }, { $set: options },
        function (err, data) {
          if (err) {
            res.json({ msg: 'product not found' + err })
          } else {
            res.json({ msg: 'product updated successfully' + data })
          }
        })

    }

  })
});

//reader er wishlist e book add
router.patch('/updatebook/:id', async (req, res) => {

  try {
    Reader.find({ _id: req.params.id }, 'wishlist -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { wishlist: req.body.wishlist } },
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


router.patch('/updateBookRead/:id', async (req, res) => {

  try {
    Reader.find({ _id: req.params.id }, 'books_read -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { books_read: req.body.books_read } },
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

//router er wishlist theke remove
router.patch('/pullbook/:id', async (req, res) => {
  try {
    
 const response=  await Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { wishlist: req.body.wishlist } }
 );
 res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.patch('/pullReadBook/:id', async (req, res) => {
  try {
    
 const response=  await Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { books_read: req.body.books_read } }
 );
 res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

router.patch('/updategenre/:id', async (req, res) => {
  try {
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { genre: req.body.genre } },
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

router.patch('/addfriend/:id', async (req, res) => {
  try {
    Reader.find({ _id: req.params.id }, 'friends -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.body.friends } },
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

router.patch('/addauthor/:id', async (req, res) => {
  try {
    Reader.find({ _id: req.params.id }, 'following -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { following: req.body.following } },
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

router.patch('/updatefriend/:id', async (req, res) => {
  try {
      const updatedPost = await Reader.updateOne(
          { _id: req.params.id },
          {
              $set: {
                  friends: req.body.friends,
              }
          }
      );
      res.json(updatedPost)
  } catch (err) {
      res.json({ message: err });
  }
})


router.patch('/updatefollow/:id', async (req, res) => {
 

  try {
    Reader.find({ _id: req.params.id }, 'following -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { following: req.body.following } },
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


router.patch('/removefollow/:id', async (req, res) => {
 

  try {
    Reader.find({ _id: req.params.id }, 'following -_id', function (err, someValue) {
      if (err) return next(err);
      // console.log(someValue);
    });
    Reader.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { following: req.body.following } },
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


module.exports = router;