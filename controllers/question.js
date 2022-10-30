const { response } = require('express')
const express = require('express')
const db = require('../models')
const router = express.Router()


router.post('/view/:id',  (req,res) => {
  // Grab our question
  // const theQuestion = await db.question.findByPk(req.params.id)
  // Create a comment

  // const newComment = await db.comment.create({
          
  // })

  db.comment.create({
    userId: res.locals.user.id,
    questionId: req.params.id,
    comment: req.body.comment
  })
  .then(response =>{
    res.redirect(`/question/view/${req.params.id}`)
  })
  //Add our comment to the existion questions
  // await theQuestion.addComment(newComment)
  // await res.locals.user.addComment(newComment)
  
  // console.log('single question viewed', newComment)
  

  })


router.post('/ask', async (req, res)=>{
  try  {
    const user = await db.user.findByPk(res.locals.user.id);
    
    const newQuestion = await db.question.create({
      title: req.body.title,
      question: req.body.question,
      category: req.body.category
      
    })

     await user.addQuestions(newQuestion)

      console.log('question created')
      // res.send(result)
      res.redirect(`/question/view/${newQuestion.id}`)
      
      
    } catch (err) {
     console.log(err) 
     res.json(err)
    }
})


//route to view one single question
router.get('/view/:id', async (req, res)=>{
  try  {
    // const user = await db.user.findAll() // res.locals.user.id // res.locals.user.id
    const user = res.locals.user
    const viewQuestion = await db.question.findByPk(req.params.id, { 
      include: [
        db.comment, db.user
      ]
    })

        console.log('single question viewed', viewQuestion.dataValues)
        // res.render('classroom/index.ejs', {question: viewQuestion} )
        res.render('question/view.ejs', {askQuestion: viewQuestion.dataValues} )
        // res.send(viewQuestion)
        
    
    } catch (err) {
       console.log(err) 
       res.json(err)
    }
    
  })
  
  
  router.get('/ask', (req, res)=>{
    res.render('question/ask.ejs')
  })

  

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