const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Finder=require('./models/bookmodel');
var cors = require('cors')

const app=express();
app.use(cors());
app.use(bodyParser.json());
//app.use(cors());
//app.use(express.json());

//Import Routes

const postRoute=require('./routes/posts');
app.use('/posts',postRoute);

const authorRoute=require('./routes/authors');
app.use('/authors',authorRoute);

const bookRoute=require('./routes/books');
app.use('/books',bookRoute);


//can use different routes for /user /admin etc

//Routes
const PublisherRouter = require('./routes/publishers');
app.use('/publishers', PublisherRouter);
const ReaderRouter=require('./routes/readers');
app.use('/readers',ReaderRouter);


app.get('/', (req,res) =>{
    
    res.send('Welcome To boipoka Homepage !!!')
})



//DB connection

mongoose.connect('mongodb+srv://boipoka:boipoka@boipokacluster.iedgm.mongodb.net/BoiPoka?retryWrites=true&w=majority' , { useNewUrlParser: true } , ()=>{
    console.log('Database connected');
})

//Listen
app.listen(3000,()=>{
console.log('server is running on port!!')
});
//app.listen(3000);
