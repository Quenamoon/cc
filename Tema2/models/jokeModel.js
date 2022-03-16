let jokes = require('../data/jokes')
const {writeDataToFile} = require('../utils')
const { v4: uuidv4 } = require('uuid')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(jokes)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const joke = jokes.find((p) => p.id === id)
        resolve(joke)
    })
}

function create(joke) {
    return new Promise((resolve, reject) => {
        const newJoke = {id: uuidv4(), ...joke}
        jokes.push(newJoke)
        writeDataToFile('./data/jokes.json', jokes)
        resolve(newJoke)
    })
}

function update(id, joke) {
    return new Promise((resolve, reject) => {
        const index = jokes.findIndex((p) => p.id === id)
        jokes[index] = joke

        console.log(index, joke)

        writeDataToFile('./data/jokes.json', jokes)
        resolve(jokes[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        jokes = jokes.filter((p) => p.id !== id)
        writeDataToFile('./data/jokes.json', jokes)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}