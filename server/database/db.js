const mongoose=require('mongoose')
const db=mongoose.connection;
const connections=process.env.DB_URL;


module.exports=function(){
    mongoose.set('strictQuery',true)
    mongoose.connect(connections,{
        useNewUrlParser:true
    })

    db.on('error',(err)=>console.log(err))
    db.on('open',()=>console.log("Databse connected success"))
    // db.close('close',()=>console.log("Database diconnected"))
}


