const router = require('express').Router()
const controller = require('./controller')

router
  .post('/', controller.createTask)
  .get('/', controller.getAllTasks)
  .get('/:id', controller.getTask)
  .put('/:id',controller.updateTask)
  .delete('/:id',controller.deleteTask)
module.exports = router