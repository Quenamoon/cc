var http = require('http');
var https = require('https')
var fs = require('fs');

const { getFlowers, getFlower, addFlower, updateFlower, deleteFlower } = require('./controllers/flowerController')
const { getJokes, getJoke, addJoke, updateJoke, deleteJoke } = require('./controllers/jokeController')

const server = http.createServer((req, res) => {
   req.url = req.url.replace("%20", " ")
   if(req.url === '/api/flowers' && req.method === 'GET') {
      getFlowers(req, res)
   } 
   else if(req.url.match(/\/api\/flowers\/([a-zA-Z ]+)/) && req.method === 'GET') {
      const name = req.url.split('/')[3]
      getFlower(req, res, name)
   } 
   else if(req.url === '/api/flowers' && req.method === 'POST') {
      addFlower(req, res)
   } 
   else if(req.url === '/api/flowers' && req.method === 'PUT') {
      res.writeHead(405, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: 'Method Not Allowed'}))
   }
   else if(req.url.match(/\/api\/flowers\/([a-zA-Z ]+)/) && req.method === 'PUT') {
      const name = req.url.split('/')[3]
      updateFlower(req, res, name)
   }
   else if(req.url === '/api/flowers' && req.method === 'DELETE') {
      res.writeHead(405, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: 'Method Not Allowed'}))
   }
   else if(req.url.match(/\/api\/flowers\/([a-zA-Z ]+)/) && req.method === 'DELETE') {
      const name = req.url.split('/')[3]
      deleteFlower(req, res, name)
   }
   else if(req.url === '/api/jokes' && req.method === 'GET') {
      getJokes(req, res)
   }
   else if(req.url.match(/\/api\/jokes\/([0-9a-z]+)/) && req.method === 'GET') {
      const id = req.url.split('/')[3]
      getJoke(req, res, id)
   }
   else if(req.url === '/api/jokes' && req.method === 'POST') {
      addJoke(req, res)
   }
   else if(req.url.match(/\/api\/jokes\/([0-9a-z]+)/) && req.method === 'PUT') {
      const id = req.url.split('/')[3]
      updateJoke(req, res, id)
   }
   else if(req.url.match(/\/api\/jokes\/([0-9a-z]+)/) && req.method === 'DELETE') {
      const id = req.url.split('/')[3]
      deleteJoke(req, res, id)
   }
   else {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: 'Route Not Found'}))
   }
})
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))