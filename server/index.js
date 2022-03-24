const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(9000, () => {
  console.log('---服务已启动--')
})

const fs = require('fs')
const syncRequest = require('sync-request')
const path = require('path')

app.post('/track', function (req, res) {
  const updateFile = function (response, body, path) {
    console.log('**********************', body)
    if (body.status == 2) {
      const file = syncRequest('GET', body.url)
      fs.writeFileSync(path, file.getBody())
    }
    response.write('{"error":0}')
    response.end()
  }

  const readbody = function (request, response, path) {
    const content = ''
    request.on('data', function (data) {
      content += data
    })
    request.on('end', function () {
      const body = JSON.parse(content)
      updateFile(response, body, path)
    })
  }

  if (req.body.hasOwnProperty('status')) {
    console.log('111', res, req.body)
    updateFile(res, req.body, path.join(__dirname, 'saveDocs'))
  } else {
    console.log('222', req, res)
    readbody(req, res, path.join(__dirname, 'saveDocs'))
  }
})
