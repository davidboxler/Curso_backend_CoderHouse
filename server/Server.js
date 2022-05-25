const http = require('http')

const server = http.createServer((request, response) => {
    response.end('Hola David!!!')
})

const connectedServer = server.listen(8080, () => {
    console.log(`Server http listening on ${connectedServer.address().port} ....`)
})