const findPlanetAxios = require('../service/axios_service')
const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');
const repository = require('../repository/planet_repository')
const config = require('../config/dataBase')

module.exports = { 
    async searchPlanetSwapi(planet){
        try {
            let planetsFound = await findPlanetAxios.findPlanetNameAxios(planet.name)
            let planetBuild = this.buildModel(planetsFound)
            let planetSaved = await repository.savePlanet(planetBuild)
            return planetSaved
        } catch (error) {
            throw error        
        }
    },

    async  findPlanet(planet){
        try {
            let query = {}
            let foundPlanet = {}

            if(planet.planetId)
                query = { planetId : planet.planetId }
            else
                query = { name : {$regex: `.*${planet.name}.*`} }

            return foundPlanet = await repository.findPlanet(query)
        
        } catch (error) {
            throw error
        }
    },

    async findAndRemovePlanet(planet){
        try {
            let foundPlanet = {}
            let query  = { planetId : planet.planetId }
            return foundPlanet = await repository.findAndRemovePlanet(query)
        } catch (error) {
            throw error
        }
    },

    async  findAllPlanet(params){
        try {
            let param = {}
            let foundAllPlanet =  {}
            

            if(params.name){
                param.query = { name : {$regex: `.*${params.name}.*`} }
            }

            param.page = parseInt(params.page) ? parseInt(params.page): config.limit.page
            param.skip = params.page * config.limit.items

            return foundAllPlanet = await repository.findAllPlanet(param)
        } catch (error) {
            throw error
        }
    },

    buildUpdate(update, body){
        let queryUpdate = {}
        if(body.name && update.name != body.name){
            queryUpdate.name = body.name
        }

        if(body.terrain && update.terrain != body.terrain){
            queryUpdate.terrain = body.terrain
        }
        if(body.climate && update.climate != body.climate){
            queryUpdate.climate = body.climate
        }
        if(body.films && update.films != body.films){
            queryUpdate.films = body.films
        }
        queryUpdate.planetId = update.planetId
        return queryUpdate
    },

    buildModel(param){
        let planet = new Planet({
            name: param.name,
            climate: param.climate,
            terrain: param.terrain,
            films: param.films.length ? param.films.length: param.films
        }); 
        
        return planet
    },

    validateBody(body){
        if(!body.name || !body.climate || !body.terrain || !body.films) 
            throw "Todos os campos: nome, clima, terreno, qtdAparicoesEmFilmes são obrigatórios"

    },

    validateUpdateBody(body){
        if(!body.planetId)
            throw "Id do planeta é obrigatório!"
        
        if(!body.name && !body.climate && !body.terrain && !body.films) 
            throw "Ao menos um dos os campos: nome, clima, terreno, qtdAparicoesEmFilmes e obrigatório"
    }
}