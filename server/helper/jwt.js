var jwt = require('jsonwebtoken');
module.exports = {
  generateToken(obj){
    return jwt.sign(obj, process.env.JWT);
  },
  decodeToken(token){
    return jwt.verify(token, process.env.JWT)
  }
}