const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

//Import Routes

const postRoute=require('./routes/posts');
app.use('/posts',postRoute);

const authorRoute=require('./routes/authors');
app.use('/authors',authorRoute);

const bookRoute=require('./routes/books');
app.use('/books',bookRoute);


//can use different routes for /user /admin etc

//Routes

app.get('/', (req,res) =>{
    res.send('Welcome To boipoka Homepage !!!')
})

//DB connection

mongoose.connect('mongodb+srv://boipoka:boipoka@boipokacluster.iedgm.mongodb.net/BoiPoka?retryWrites=true&w=majority' , { useNewUrlParser: true } , ()=>{
    console.log('Database connected');
})

//Listen
app.listen(3000);
