const User=require('../models/user');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt=require('jsonwebtoken');
const Feedback=require('../models/feedback');
module.exports.create=async (req,res)=>{
    try {
        if(req.body.password!=req.body.cp){
            console.log("Both passwords should be matching");
            const Error=new Error();
            throw Error;
        }
        let allUsers=await User.findOne({email:req.body.email});
        if(!allUsers){
            const {name,email,password}=req.body;
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                 User.create({
                    name,email,password:hash
                   })
            });
         
           console.log("User Registered Succ");
           return res.status(200).json({
            message:"User created Successfully"
           })
        }else{
            console.log("User Already registered");
            return res.status(502).json({
                message:"User Already registered"
               })
        }
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }
   
}

module.exports.createSession=async(req,res)=>{
    try {
        let allUsers=await User.findOne({email:req.body.email})
     
        if(!allUsers){
            console.log("Cannot find user");
            return res.status(422).json({
                message:"Unauthorized access"
            })
        }else{
            bcrypt.compare(req.body.password, allUsers.password).then(function(result) {
                // result == true
                if(result){
                    // console.log("Inside true");
                    let token=jwt.sign(allUsers.toJSON(),process.env.SECRET,{expiresIn:'10000000'});
                    res.cookie('jwt',token)
                    return res.status(200).json({
                        message:"Signin Successfull",
                    })
                }else{
                    console.log("Invalid username or password");
                    return res.status(401).json({
                        message:"Invalid username or password"
                    })
                }
            });
          
        }
        
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }


}
//Authenticated Route

module.exports.verifyUser=async (req,res)=>{

    return res.status(200).send(req.user)
}

module.exports.signIn=async (req,res)=>{
    // return res.redirect("https://secrets-weld.vercel.app/sign-in")
}
module.exports.secretPage=async(req,res)=>{
    // return res.redirect("https://secrets-weld.vercel.app/secret-page")

}

module.exports.googleHome=async (req,res)=>{
    let token=jwt.sign(req.user.toJSON(),process.env.SECRET,{expiresIn:'1000000'});
    res.cookie('jwt', token);
    return res.redirect('http://localhost:3000/secret-page')

}
module.exports.logout=async (req,res)=>{
        res.clearCookie('jwt')
   
        return res.status(200).json({
            message:"Logout Successs"
        })
}

//Saving users Feedback
module.exports.saveFeedback=async(req,res)=>{
    try {
        var allFeedback=await Feedback.find();
        let uid=allFeedback.length;
        // console.log(allFeedback.length);
        if(!req.body.email||!req.body.content){
            return res.status(422).json({
                message:"Plzz Fill The Form to save"
            })
        }
        let feedId=`Feed00${uid+1}`;
        // console.log(feedId);
        let newFeedback=await Feedback.create({
            feedId:feedId,
            email:req.body.email,
            content:req.body.content
        })
        if(!newFeedback){
            console.log("Error");
            const Error=new Error();
            throw Error;
        }        
        return res.status(200).json({
            message:"Feedback submitted sucessfully"
        })
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }

}