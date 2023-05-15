const express=require('express')
const app=express()
require('dotenv').config()
// const xss=require('xss')
const port=3000;
const connectDb=require('./database/db')
const helmet=require('helmet')
const cors=require('cors')
const morgan=require('morgan')
const userRoute=require('./routes/users/usersRoute')
const authRoute=require('./routes/users/authRoute')
const routes=require('./routes/todoRoute')

// app.use(xss())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))


//configuring engine
// app.set('view engine','jsx')
// app.engine('jsx',require('jsx-view-engine').createEngine)

app.get('/',(req,res)=>{
    res.json({
        msg:"app is on"
    })
})

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'buld','index.html'))
})

//routes usage
app.use(routes)
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)


app.listen(port,(err)=>{
    if(err) return err;
    console.log(`server is running on port ${port}`);
    connectDb();
})