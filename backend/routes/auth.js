import express from 'express'
import User from '../models/user.js'
import { protect } from '../middleware/auth.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

//Rgisteration 
router.post('/register',async (req,res)=>{
    const {username,email,password} = req.body

    try {
         if(!username || !email || !password){
        return res.status(401).json({
            msg:"Please fill all the fields"
        })
    }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                msg:"User already Exists"
            })
        } 

        const user = await User.create({
            username,
            email,
            password
        })
        console.log(user)
        const token = generateToken(user._id)
        return res.status(201).json({
            id: user._id,
            username: user.username,  
            email:user.email,
            token
        })
    
    } catch (error) {
        res.status(500).json({
            msg:"Server Error"
        })
        console.log(error);
    }
   

})

//Login
router.post('/login',async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({
                msg: "Invalid Credentials"
            })
        }

        const token = generateToken(user._id)
        return res.json({
            id: user._id,
            username: user.username,  
            email:user.email,
            token
        })

    } catch (error) {
      res.status(500).json({
        msg:"Server Error"
      })

      console.log(error)
    }
})

//me
 router.get('/me',protect,async(req,res)=>{
    res.status(200).json(req.user)
 })

function generateToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export default router ;