const http = require('http')
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('hello world\n')
})

const port = 3000
const hostname = 'localhost'

server.listen(port, hostname, () => {
	console.log(`server running at http://${hostname}:${port}`)
})
