const express = require('express')
const Router = express.Router()
const controllers = require('./app/controllers')
const upload = require('./app/middlewares/multer')

Router.post(
  '/uploads',
  upload.single('file'),
  controllers.UploadController.store
)

module.exports = Router
