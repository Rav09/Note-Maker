require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path')

mongoose.set('strictQuery', true);
const app = express()
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.json("hello everyone this is my noteapp")
})

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.use('/users', userRouter)
app.use('/api/notes', noteRouter)


const URI = process.env.MONGODB_URL
/*mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) 
        throw err;
    console.log('Connected to MongoDB')
})*/
mongoose.connect(URI, { // useCreateIndex: true,
   // useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


  //mongodb listen

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });




    
}



