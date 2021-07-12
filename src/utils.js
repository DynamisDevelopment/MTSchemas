const sendErr = (res, err, shouldLog) => {
  if (shouldLog) console.log(err)
  res.status(400)
  res.send(err)
}

const complete = (callback, res, shouldLog) => {
  try {
    callback()
  } catch (err) {
    sendErr(res, err, shouldLog)
  }
}

const allowedUpdates = (body, res, allowedUpdates) => {
  const updates = Object.keys(body)
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })
}

const forbiddenUpdates = (body, res, forbiddenUpdates) => {
  const updates = Object.keys(body)
  const isValidOperation = updates.every(
    update => !forbiddenUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })
}

const wordLength = (val, number, greaterThan) => {
  if (greaterThan)
    return val.split(' ').length > number && val.split('&nbsp;').length > number
  else
    return val.split(' ').length < number && val.split('&nbsp;').length < number
}

module.exports = {
  sendErr,
  complete,
  allowedUpdates,
  forbiddenUpdates,
  wordLength,
}
