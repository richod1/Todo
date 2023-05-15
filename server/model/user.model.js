const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi=require('joi')
const passwordComplexity=require('joi-password-complexity')


const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,

    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,required:true,
    }
},{
    timestamps:true,
});

UserSchema.method.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_AUTH,{expiresIn:"2d"});
    return token;
}


const User=mongoose.model('User',UserSchema)

const validate=(data)=>{
    const schema=Joi.object({
        firstname:Joi.string().required().label("first name"),
        lastname:Joi.string().required().label('last name'),
        email:Joi.string().required().label('email'),
        password:passwordComplexity().required().label('password')
    })
    return schema.validate(data);

}


module.exports={
    User,validate
}
