function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.profile -
    picture -
    status(500).send({ message: "Something went wrong!", error: err.message })
}

module.exports = errorHandler
