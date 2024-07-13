const jwt = require('jsonwebtoken');

// verify jwt token
// middleware
const verifyToken=(req,res,next)=>{
    if(!req.headers.authorization){
      return res.status(401).send({message: "Unauthorised Access"})
    }
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
      if(err){
        return res.status(401).send({message:"token is invalid"})
      }
      req.decoded=decoded;
      next()
    })
  }
  
// 2:7
  module.exports=verifyToken