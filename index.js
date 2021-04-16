// require your server and launch it
const server = require("./server")

const port =  process.env.PORT || 5001

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})