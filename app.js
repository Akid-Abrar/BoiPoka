const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

//Import Routes

const postRoute=require('./routes/posts');
app.use('/posts',postRoute);
//can use different routes for /user /admin etc

//Routes

app.get('/', (req,res) =>{
    res.send('Welcome To Homepage !!!')
})

//DB connection

mongoose.connect('mongodb://localhost/BIIS' , { useNewUrlParser: true } , ()=>{
    console.log('Database connected');
})

//Listen
app.listen(3000);