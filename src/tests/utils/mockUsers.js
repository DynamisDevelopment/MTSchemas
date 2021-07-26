const mongoose = require('mongoose')

const userId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userId,
  name: 'Joe Mama',
  username: 'ligmaballs1111',
  email: 'cicerosrepublic72@gmail.com',
  password: 'strongPassword',
}

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Deez Nutz',
  username: 'ligmaballs2222',
  email: 'cicerosrepublic72@gmail.com',
  password: 'strongerPassword!',
}

module.exports = {
  userId,
  userOne,
  userTwo,
}
