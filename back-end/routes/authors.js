const express = require('express');
const Finder = require('../models/authormodel')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const loggedAuthors = await Finder.find();
        res.json(loggedAuthors)
    } catch (err) {
        res.json({ message: err });
    }
})

//Find with special mongo document ID

router.get('/:id', async (req, res) => {
    try {
        const loggedAuthors = await Finder.findById(req.params.id);
        res.json(loggedAuthors)
    } catch (err) {
        res.json({ message: err });
    }
})

router.post('/', async (req, res) => {
    const Author = new Finder({
        // _id: req.body._id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        image:req.body.image,
        biography: req.body.biography,
        books: req.body.books,
        followers: req.body.followers
    });

    try {
        const savedAuthor = await Author.save();
        res.json(savedAuthor)
    } catch (err) {
        res.json({ message: err });
    }

})

//Delete with special mongo document ID

router.delete('/:id', async (req, res) => {
    try {
        const removedAuthor = await Finder.remove({ _id: req.params.id });
        res.json(removedAuthor)
    } catch (err) {
        res.json({ message: err });
    }
})

//Update with special mongo document ID


router.patch('/:id', async (req, res) => {
    try {
        const author = await Finder.update(
            { _id: req.params.id },
            {
                $set: {

                    biography: req.body.biography,
                    books: req.body.books,
                    followers: req.body.followers
                }
            }
        );
        res.json(author)
    } catch (err) {
        res.json({ message: err });
    }
})
//add into followers array

router.patch('/updateauthor/:id', async (req, res) => {
    try {
     Finder.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: {followers: req.body.followers } },
        function (error, success) {
          if (error) {
              console.log(error);
              res.json('error')
          } else {
              console.log(success);
              res.json("successfully added followers")
          }
      });
    
      
    }catch(err)
    {
      console.log(err);
      res.json(err);
    }
    })

    router.patch('/updatebio/:id', async (req, res) => {
        try {
         Finder.findOneAndUpdate(
            { _id: req.params.id }, 
            { biography: req.body.biography  },
            function (error, success) {
              if (error) {
                  console.log(error);
                  res.json('error')
              } else {
                  console.log(success);
                  res.json("successfully update bio")
              }
          });
        
          
        }catch(err)
        {
          console.log(err);
          res.json(err);
        }
        })

//update image
router.patch('/image/:id', async (req, res) => {
    try {
        const book = await Finder.updateOne(
            { _id: req.params.id },
            {
                $set: {
  
                    image: req.body.image,
  
                }
            }
        );
        res.json(book)
    } catch (err) {
        res.json({ message: err });
    }
  })

module.exports = router;