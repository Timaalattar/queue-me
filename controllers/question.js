const { response } = require('express')
const express = require('express')
const db = require('../models')
const askquestions = require('../models/askquestions')
const router = express.Router()

router.post('/view/:id', async (req,res) => {
  // Grab our question
await db.askquestions.findByPk(req.params.id)
  // Create a comment
  const [newComment, created] = await db.comments.findOrCreate({
      where: {
          comment: req.body.comment
      }
  })
  //Add our comment to the existion questions
  await askquestions.addComment(newComment)

  //redirect to posingle view details page
  res.redirect(`/view/${req.params.id}`)
  })



//route to view one single question
router.get('/view/:id', async (req, res)=>{
  try  {
    // const user = await db.user.findAll() // res.locals.user.id // res.locals.user.id
    const user = res.locals.user
    const viewQuestion = await db.askquestions.findByPk(req.params.id, { 
      include: [{
        model: db.user,
        include: [db.comments]
      }]
    })

        console.log('single question viewed', viewQuestion.dataValues)
        // res.render('classroom/index.ejs', {question: viewQuestion} )
        res.render('question/view.ejs', {askQuestion: viewQuestion.dataValues} )
  
    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }

})
  

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
        // res.send(result)
        res.redirect(`/question/view/${newQuestion.id}`)

    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }
})

// router.post("/:id", async (req, res) => {
//   try  {
//     const user = await db.user.findByPk(res.locals.user.id) // res.locals.user.id

//     const oneQuestion = await db.askquestions.findByPk(req.params.id) 
//       // user.dataValues.fullName
//       // db,getUser ({fullName: req.body.fullName}))
//       await user.addAskQuestions(oneQuestion)
//       await user.getAskQuestions()

//         console.log('question viewed')
//         res.render('question/view.ejs', {askQuestion: oneQuestion})

    
//     } catch (err) {
//        console.log(err) 
//        res.json(err)
//     }
// })

module.exports = router