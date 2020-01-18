const findPlanetAxios = require('../service/axios_service')
const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');
const repository = require('../repository/planet_repository')

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

            if(planet.name)
                query = { name : {$regex: `.*${planet.name}.*`} }
            else
                query = { planetId : planet.idPlanet }

            return foundPlanet = await repository.findPlanet(query)
        
        } catch (error) {
            throw error
        }
    },

    async findAndRemovePlanet(planet){
        try {
            let foundPlanet = {}
            let query  = { planetId : planet.idPlanet }
            return foundPlanet = await repository.findAndRemovePlanet(query)
        } catch (error) {
            throw error
        }
    },

    async  findAllPlanet(params){
        try {
            let param = {}
            let foundAllPlanet =  {}
            
            param.page = parseInt(params.page)
            param.limit = 10
            param.skip = param.page * param.limit

            return foundAllPlanet = await repository.findAllPlanet(param)
        } catch (error) {
            throw error
        }
    },

    async removePlanet(idPlanet){
        try {
            let query = { planetId : idPlanet }
            return foundAllPlanet = await repository.removePlanet(query)
        } catch (error) {
            throw error
        }
    },

    update(update, body){
        let queryUpdate = {}
        if(update.nome != body.nome){
            queryUpdate.nome = update.nome
        }

        if(update.terrain != body.terrain){
            queryUpdate.terrain = update.terrain
        }
        if(update.climate != body.climate){
            queryUpdate.climate = update.climate
        }
        if(update.qtdAparicoesEmFilmes != body.qtdAparicoesEmFilmes){
            queryUpdate.qtdAparicoesEmFilmes = update.qtdAparicoesEmFilmes
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
            throw res.status(400).send({message: "Todos os campos: nome, clima, terreno, qtdAparicoesEmFilmes são obrigatórios"})

    }
}