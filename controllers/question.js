const { response } = require('express')
const express = require('express')
const db = require('../models')
const router = express.Router()


router.get('/ask', (req, res)=>{
    res.render('question/ask.ejs')
})

router.post('/ask', async (req, res)=>{
    try  {
    const user = await db.user.findByPk(res.locals.user.id);

    const newQuestion = await db.askquestions.create({
        title: req.body.title,
        question: req.body.question,
        category: req.body.category
    
      })

      await user.addAskquestions(newQuestion)

        console.log('question created')
        res.render('question/view.ejs', {askquestion: newQuestion} )

    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }
})

router.post("/question/:id", async (req, res) => {
  try  {
    const user = await db.user.findByPk(res.locals.user.id) // res.locals.user.id

    const viewQuestion = await db.askquestions.findByPk(req.params.id) 
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

router.get('/view/:id', async (req, res)=>{
  try  {
    const user = await db.user.findAll() // res.locals.user.id // res.locals.user.id
  
    const viewQuestion = await db.askquestions.findByPk(req.params.id)

        console.log('single question viewed')
        // res.render('classroom/index.ejs', {question: viewQuestion} )
        res.render('question/view.ejs', {askquestion: viewQuestion} )
  
    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }

})
module.exports = router