const {Comic} = require('../models')
class ComicController{
  static list(req,res,next){
    console.log('ini get')
    Comic.findAll()
    .then(comics=>{
      res.status(200).json(comics)
    })
    .catch(err=>{
      next(err)
    })
  }
  static find(req,res,next){
    console.log('ini find')
    Comic.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(comic=>{
      // console.log(comic)
      res.status(200).json(comic[0])
    })
    .catch(err=>{
      next(err)
    })
  }
  static update(req,res,next){
    console.log('ini update')
    Comic.update({
      title: req.body.title,
      author: req.body.author,
      imageUrl: req.body.imageUrl
    },{
      where: {
        id: req.params.id
      }
    })
    .then(comic=>{
      // console.log(comic)
      console.log('update sukses')
      res.status(200).json(comic[0])
    })
    .catch(err=>{
      console.log(err,'error lagi update')
      next(err)
    })
  }
}

module.exports = ComicController