let flowers = require('../data/flowers')
const {writeDataToFile} = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(flowers)
    })
}

function findByName(name) {
    return new Promise((resolve, reject) => {
        const flower = flowers.find((p) => p.name === name)
        resolve(flower)
    })
}

function create(flower) {
    return new Promise((resolve, reject) => {
        flowers.push(flower)
        writeDataToFile('./data/flowers.json', flowers)
        resolve(flower)
    })
}

function update(name, flower) {
    return new Promise((resolve, reject) => {
        const index = flowers.findIndex((p) => p.name === name)
        flowers[index] = flower

        console.log(index, flower)

        writeDataToFile('./data/flowers.json', flowers)
        resolve(flowers[index])
    })
}

function remove(name) {
    return new Promise((resolve, reject) => {
        flowers = flowers.filter((p) => p.name !== name)
        writeDataToFile('./data/flowers.json', flowers)
        resolve()
    })
}

module.exports = {
    findAll,
    findByName,
    create,
    update,
    remove
}