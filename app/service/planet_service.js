const findPlanetAxios = require('../service/axios_service')
const Planet = mongoose.model('Planet');
const mongoose = require('mongoose')

module.exports = { 
    async searchPlanetSwapi(planetName, res){
        try {
            let planetsFound = await findPlanetAxios.findPlanetNameAxios(planetName.name)
            let planet = buildModel(planetsFound)
            let planetSaved = await repository.savePlanet(planet)
            let planetReturn = planetDto.returnDto(planetSaved) 
            return planetReturn
        } catch (error) {
            throw error        
        }
    },

    async  findPlanet(planet){
        try {
            let query = {}
            let foundPlanet = {}

            if(planet.name)
                query = { nome : {$regex: `.*${planet.name}.*`} }
            else
                query = { planetId : planet.idPlanet }

            return foundPlanet = await repository.findPlanet(query)
        
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

     buildModel(param){
        let planet = new Planet({
            nome: param.name,
            clima: param.climate,
            terreno: param.terrain,
            qtdAparicoesEmFilmes: param.films.length ? param.films.length: param.films
        }); 
        
        return planet
    }

}