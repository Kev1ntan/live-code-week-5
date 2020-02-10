const {User} = require('../models')
const {generateToken} = require('../helper/jwt')
const {compare} = require('../helper/bcyript')
class UserController{
  static register(req,res,next){
    let {username,email,password} = req.body
    console.log(username,email,password)
    User.create({name: username,email,password})
    .then(user=>{
      let objToken = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      let token = generateToken(objToken)
      res.status(201).json({token: token})
    })
    .catch(err=>{
      next(err)
    })
  }
  static login(req,res,next){
    let {email,password} = req.body
    console.log(email,password)
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user=>{
      // console.log(compare(password, user.password))
      // console.log(user)
      if(user !== null){
        if(compare(password, user.password)){
          let objToken = {
            id: user.id,
            username: user.username,
            email: user.email
          }
          let token = generateToken(objToken)
          console.log(token)
          res.status(201).json(token)
        }else{
          throw{
            status: 404,
            message: `email/password is wrong`
          }
        }
      }else{
        throw {
          status: 404,
          message: `email/password is wrong`
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = UserController