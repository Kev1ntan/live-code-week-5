
module.exports = (req,res,next)=>{
  if(req.headers.token){
    next()
  }else{
    throw {
      status: 400,
      message: `token invalid`
    }
  }
}