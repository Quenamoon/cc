const Joke = require('../models/jokeModel')
const { getPostData } = require('../utils')

// @desc Gets All Jokes
// @route GET /api/jokes
async function getJokes(req, res) {
    try {
        const jokes = await Joke.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(jokes))
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Gets Single Joke
// @route GET /api/jokes/:id
async function getJoke(req, res, id) {
    try {
        const joke = await Joke.findById(id)

        if(!joke) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Joke Not Found'}))
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(joke))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Add a Joke
// @route POST /api/jokes
async function addJoke(req, res) {
    try {
        const body = await getPostData(req)

        const { category, text } = JSON.parse(body)

        const joke = {
            category,
            text
        }

        if(!category || !text) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Invalid Input'}))
        }
        
        const newJoke = await Joke.create(joke)
        res.writeHead(201, {'Content-Type': 'application/json', 'Location': `/api/jokes/${newJoke.id}`})
        return res.end(JSON.stringify(newJoke))
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Update a Joke
// @route PUT /api/jokes/:id
async function updateJoke(req, res, id) {
    try {
        const joke = await Joke.findById(id)
        if(!joke) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Joke Not Found'}))
        }
        else {
            const body = await getPostData(req)

            const { category, text } = JSON.parse(body)

            const jokeData = {
                id,
                category: category || joke.category,
                text: text || joke.text
            }
            
            const updatedJoke = await Joke.update(id, jokeData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedJoke))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Delete a Joke
// @route DELETE /api/jokes/:id
async function deleteJoke(req, res, id) {
    try {
        const joke = await Joke.findById(id)

        if(!joke) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Joke Not Found'}))
        }
        else {
            await Joke.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Joke ${id} removed from data set`}))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

module.exports = {
    getJokes,
    getJoke,
    addJoke,
    updateJoke,
    deleteJoke
}