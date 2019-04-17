'use strict'

const jimp = require('jimp')
const { promisify } = require('util')

const { blur, gaussian, normal, finish } = require('../tasks/QRcode')

class UploadController {
  async store (req, res) {
    try {
      const { ...data } = req.file
      const readJimp = promisify(jimp.read).bind(jimp)
      const image = await readJimp(data.buffer)

      const qrcode = await Promise.race([
        normal(image),
        gaussian(image, 1),
        gaussian(image, 2),
        blur(image, 1),
        blur(image, 2),
        finish()
      ])

      return res.send({ decode: qrcode.data })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'QRCode not found' })
    }
  }
}

module.exports = new UploadController()
