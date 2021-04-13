const users = require("../users/users-model")

function logger(format) {
  // DO YOUR MAGIC
  return (req, res, next) => {
  const time = new Date().toISOString()
	if (format === "short") {
    console.log(`${time} ${req.method} ${req.url}`)
  }
  if (format === "long") {
    console.log(`[${time}] ${req.ip} ${req.method} ${req.url} ${req.socket.bytesRead}`)
  }
  next()
  }
}

function validateUserId() {
  // DO YOUR MAGIC
  return (req, res, next) => {
		users.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user // make user available to later middleware functions
					next()
				} else {
					res.status(404).json({
						message: "User not found",
					})
				}
			})
			.catch((error) => {
				console.log(error)
				res.status(500).json({
					message: "Error retrieving the user",
				})
			})
	}
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
		if (!req.body.name ) {
			return res.status(400).json({
				message: "missing required name field",
			})
		}
		next()
	}
}

function validatePost() {
  // DO YOUR MAGIC
  return (req, res, next) => {
		if (!req.body.text ) {
			return res.status(400).json({
				message: "missing required text field",
			})
		}
		next()
	}
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}