const { response } = require('express')
const express = require('express')
const db = require('../models')
const router = express.Router()


router.get('/ask', (req, res)=>{
    res.render('question/ask.ejs')
})

router.post('/ask', async (req, res)=>{
    try  {
    const user = await db.user.findbyPK(req.user.id)

    const newQuestion = await db.askquestions.create({
        title: req.body.title,
        question: req.body.question,
        category: req.body.category
    
      })

      await user.addAskQuestions(newQuestion)

        console.log('question created')
        res.render('classeoom/index.ejs', )

    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }
})




module.exports = router