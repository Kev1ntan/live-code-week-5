const bcrypt = require('bcrypt')
module.exports = {
  hashing(input){
    return bcrypt.hashSync(input, 11)
  },
  compare(input,hash){
    return bcrypt.compareSync(input, hash)
  }
}