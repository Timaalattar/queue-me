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
{/* <p><%= article.content %></p> */}

// <%/* <form method="POST" action="/view/<%= askquestionId %>"> */%>
{/* <form method="POST" action="/view/<%= askquestionId %>?_method=PUT">
<button type="submit">Reply</button>
</form> 

<form action="/users" method="GET">
<button type="submit">Waitlist</button>
</form>    */}

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


module.exports = router