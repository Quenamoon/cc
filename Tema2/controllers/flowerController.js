const Flower = require('../models/flowerModel')
const { getPostData } = require('../utils')

// @desc Gets All Flowers
// @route GET /api/flowers
async function getFlowers(req, res) {
    try {
        const flowers = await Flower.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(flowers))
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Gets Single Flower
// @route GET /api/flowers/:name
async function getFlower(req, res, name) {
    try {
        const flower = await Flower.findByName(name)

        if(!flower) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Flower Not Found'}))
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(flower))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Add a Flower
// @route POST /api/flowers
async function addFlower(req, res) {
    try {
        const body = await getPostData(req)

        const { name, origin, description } = JSON.parse(body)

        const found = await Flower.findByName(name)
        if(found){
            res.writeHead(409, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: "Flower with the same name already exists"}))
        }
        else {
            const flower = {
                name,
                origin,
                description,
            }
            
            const newFlower = await Flower.create(flower)
    
            res.writeHead(201, {'Content-Type': 'application/json', 'Location': `/api/flowers/${name}`})
            return res.end(JSON.stringify(newFlower))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Update a Flower
// @route PUT /api/flowers/:name
async function updateFlower(req, res, initialName) {
    try {
        const flower = await Flower.findByName(initialName)
        if(!flower) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Flower Not Found'}))
        }
        else {
            const body = await getPostData(req)

            const { name, origin, description } = JSON.parse(body)

            const flowerData = {
                name: name || flower.name,
                origin: origin || flower.origin,
                description: description || flower.description,
            }

            console.log(flowerData)
            
            const updatedFlower = await Flower.update(initialName, flowerData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedFlower))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

// @desc Delete a Flower
// @route DELETE /api/flowers/:name
async function deleteFlower(req, res, name) {
    try {
        const flower = await Flower.findByName(name)

        if(!flower) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Flower Not Found'}))
        }
        else {
            await Flower.remove(name)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Flower ${name} removed from data set`}))
        }
    } catch(error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Internal Error!'}))
    }
}

module.exports = {
    getFlowers,
    getFlower,
    addFlower,
    updateFlower,
    deleteFlower
}