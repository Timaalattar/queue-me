const { response } = require('express')
const express = require('express')
const db = require('../models')
const router = express.Router()


router.get('/ask', (req, res)=>{
    res.render('question/ask.ejs')
})

router.post('/ask', async (req, res)=>{
    try  {
    const user = await db.user.findByPK(res.locals.user.pk);

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

router.post("/question/:id", async (req, res) => {
  try  {
    const user = await db.user.findbyPk(res.locals.user.id) // res.locals.user.id

    const viewQuestion = await db.askquestions.findbyPK(req.params.id) 
      // user.dataValues.fullName
      // db,getUser ({fullName: req.body.fullName}))
      await user.addAskQuestions(viewQuestion)
      await user.getAskQuestions()

        console.log('question viewed')
        res.render('question/view.ejs', {} )

    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }
})


module.exports = router