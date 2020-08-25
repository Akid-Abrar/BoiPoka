const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

//Import Routes

const studentRoute=require('./routes/students');
app.use('/students',studentRoute);

const teacherRoute=require('./routes/teachers');
app.use('/teachers',teacherRoute);

const resultRoute=require('./routes/results');
app.use('/results',resultRoute);


//can use different routes for /user /admin etc

//Routes

app.get('/', (req,res) =>{
    res.send('Welcome To Homepage !!!')
})

//DB connection

mongoose.connect('mongodb+srv://Akid:Akid@biis.lvoz1.mongodb.net/BIIS-Model?retryWrites=true&w=majority' , { useNewUrlParser: true } , ()=>{
    console.log('Database connected');
})

//Listen
app.listen(3000);
