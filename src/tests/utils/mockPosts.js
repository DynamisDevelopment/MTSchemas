const mongoose = require('mongoose')

const postId = new mongoose.Types.ObjectId()
const postOne = {
  _id: postId,
  title: 'How we do this thing',
  caption: 'Maybe you can learn to do this thing too?',
  categories: 'travel',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At repellat, soluta ullam, adipisci possimus alias numquam, veniam nisi facere quas unde ratione? Vel minus maiores atque vitae molestiae, perspiciatis sequi?',
  afterthought: 'Some other things',
  meta: {
    keywords: ['travel', 'diy'],
  },
}

const postTwo = {
  ...postOne,
  _id: new mongoose.Types.ObjectId(),
  title: "Don't listen to us, we don't know what we're doing",
}

module.exports = {
  postId,
  postOne,
  postTwo,
}
