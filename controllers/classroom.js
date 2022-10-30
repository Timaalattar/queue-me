const express = require('express')
const db = require('../models')
const router = express.Router()


//Get the list of questions on the classroom page

router.get('/', async (req, res)=>{
    try  {
      const user = await db.user.findAll() // res.locals.user.id // res.locals.user.id
    
      const listQuestion = await db.askquestions.findAll({include: [db.user]})

    //   console.log(listQuestion[0])
        // user.dataValues.fullName
        // db,getUser ({fullName: req.body.fullName}))
        // await user.addAskQuestions(viewQuestion)
        // await user.getAskQuestions()
    
        //   console.log('question list viewed')
          res.render('classroom/index.ejs', {listQuestions: listQuestion} )
        //   res.json(listQuestion)
    
      
      } catch (err) {
         console.log(err) 
         res.json(err)
      }

})





module.exports = router