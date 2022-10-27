const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', async (req, res)=>{
    try  {
      const user = await db.user.findAll() // res.locals.user.id // res.locals.user.id
    
      const listQuestion = await db.askquestions.findAll()
        // user.dataValues.fullName
        // db,getUser ({fullName: req.body.fullName}))
        // await user.addAskQuestions(viewQuestion)
        // await user.getAskQuestions()
    
          console.log('question viewed')
          res.render('classroom/index.ejs', { listQuestions: listQuestion} )
    
      
      } catch (err) {
         console.log(err) 
         res.json(err)
      }

})





module.exports = router