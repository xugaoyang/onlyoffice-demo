var http = require('http')

http.createServer(function(req, res) {
  res.write('<head><meta charset="utf-8"></head>')
  console.log(req, res)
  res.write('服务器启动...')
  res.end()
}).listen(3000)