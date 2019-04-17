'use strict'

const jsqr = require('jsqr')

const normal = image => {
  return new Promise((resolve, reject) => {
    const decode = jsqr(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height
    )

    if (decode) resolve(decode)
  })
}

const blur = (image, blur) => {
  return new Promise(async (resolve, reject) => {
    image.blur(blur)
    const decode = await jsqr(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height
    )
    if (decode) resolve(decode)
  })
}

const gaussian = (image, gaussian) => {
  return new Promise(async (resolve, reject) => {
    image.gaussian(gaussian)
    const decode = await jsqr(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height
    )
    if (decode) resolve(decode)
  })
}

const finish = () => {
  return new Promise(async (resolve, reject) => {
    setTimeout(resolve, 15000)
  })
}

module.exports = { blur, gaussian, normal, finish }
