// require your server and launch it
const server = require("./api/server")

const port =  process.env.PORT || 5001

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

//,"server": "nodemon index.js",
//"test": "cross-env NODE_ENV=testing jest --watch --verbose --runInBand --silent",
//"resetdb": "knex migrate:rollback && knex migrate:latest && knex seed:run"