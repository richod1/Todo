const express=require('express')
const router=express.Router()
const {User}=require('../../model/user.model')
const Joi=require('joi')
const bcrypt=require('bcrypt')

router.get('/', async(req,res)=>{
    try{
        const {err}=validate(req.body)
        if(err)
        return res.status(400).send({message:err.details[0].message})

        const {user}= await User.findOne({email:req.body.email})

        if(!user){
            return res.status(401).send({msg:"Invalid email or Password"})
        };

        const validPassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(401).send({msg:"Invalid email or password"})
        }

        const token=user.generateAuthToken();
        res.status(200).send({data:token,msg:"Logged in successfully"})
        
    }catch(err){
        res.status(500).send({err:"Internal server error"})
    }


});

const validate=(data)=>{
    const schema=Joi.object({
        email:Joi.string().email().required().label('email'),
        password:Joi.string().required().label('Password')

        
    })
    return schema.validate(data);
}

module.exports=router;