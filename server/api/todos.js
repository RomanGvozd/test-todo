const { Router } = require("express")
const mongodb = require('mongodb')
const fs = require("fs")
const router = Router()
const Todo = require('../models/Todo')
const { nextTick } = require("process")

router.get('/', async(req, res)=> {

    try {
        Todo.find({}, function(err, foundData) { 
            if(err) {
                console.log(err);
                return res.status(500).send()
            } else {
                return res.status(200).send(foundData)
            }
        })
    } catch (error) {
        console.log(e)
        res.send({message: "Server error"})
    }
  
})

router.post("/",

  async (req, res) => {

    try{
      const { formValues } = req.body
      
      const todo = new Todo({ 
        title: formValues,
        completed: false,
      })
      await todo.save()
      return res.status(201).send(todo)

    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }

})

router.put('/update/:id', async (req, res)=> {
  try {
    const { params:{id}, body } = req

    const todo = await Todo.findOne({_id: id})

    todo.title = body.title
    todo.completed = body.completed

    await todo.save()
    return res.status(200).send(todo)

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }

})

router.put('/', async (req, res)=> {
  try {
    const { id } = req.body

    const todo = await Todo.findOne({_id: id})

    todo.completed = !todo.completed
    await todo.save()
    return res.status(200).send(todo)

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }

})

router.delete('/:id', async (req, res)=> {

  try {
    const id = req.params.id

    if(id === 'all'){
      const todos = await Todo.find({}).remove({})
      res.json({message: "Todos clear"})

    } else {
      Todo.deleteOne({ _id: id }, function (err, results) {
      })
      res.json({_id:id})

    }

  } catch (error) {
    console.log(e)
    res.send({message: "Server error"})

  }

})

module.exports = router