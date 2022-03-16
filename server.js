const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.get('', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static('Cars'))
app.use('/css',express.static(__dirname + '/css'))
app.use('/js',express.static(__dirname + '/js'))
app.use('/xml',express.static(__dirname + '/xml'))

app.listen(port, () => console.info('listening on port ' + port))
