const Joi=require('joi')
const {User,validate}=require('../../model/user.model')
const bcrypt=require('bcrypt')
const express=require('express')
const router=express.Router()

router.post("/", async (req,res)=>{
    try{
        const {error}=validate(req.body)

        if(error)
        return res.status(400).send({msg:error.details[0].message});

        const {user}=await User.findOne({email:req.body.email})
        if(user)
        return res.status(409).send({msg:"User already exist!!"})


const salt=await bcrypt.genSalt(Number(process.env.PASS_SALT))
const hashedPassword=await bcrypt.hash(req.body.password,salt);

await new User({...req.body,password:hashedPassword}).save();
res.status(201).send({msg:"User created Successfully"})



    }catch(err){
        res.status(500).send({err:"Internal serever error"})
    }
})

module.exports=router;

