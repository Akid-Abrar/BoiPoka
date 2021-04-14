const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());
//app.use(cors());
//app.use(express.json());

//Import Routes

const PublisherRouter = require('./routes/publishers');
app.use('/publishers', PublisherRouter);
const ReaderRouter=require('./routes/readers');
app.use('/readers',ReaderRouter);


app.get('/', (req,res) =>{
    res.send('Welcome To Homepage !!!')
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
