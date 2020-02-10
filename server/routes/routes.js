const express = require('express')
const route = express.Router()
const user = require('../controllers/userController')
const comic = require('../controllers/comicController')
const authentication = require('../middlewares/authentication')

route.post('/register',user.register)
route.post('/login',user.login)
route.use(authentication)
route.get('/comics',comic.list)
route.get('/comic/:id',comic.find)
route.put('/comics/:id',comic.update)



module.exports = route