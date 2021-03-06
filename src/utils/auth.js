const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'ThisIsMySecret324@!')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) throw new Error('No user found')

    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = auth
