const express = require('express')
const Asset = require('../schemas/asset')
const { complete } = require('../utils')

const router = new express.Router()

router.get('/images/:id', async (req, res) => {
  let image = await Asset.findById(req.params.id)

  complete(() => {
    if (!image) throw new Error('No Image Found')

    res.set('Content-Type', 'image/png')
    res.send(image.asset)
  }, res)
})

module.exports = router
