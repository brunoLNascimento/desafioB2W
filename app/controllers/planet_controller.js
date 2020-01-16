const findPlanetAxios = require('../service/axios_service')
const repository = require('../repository/planet_repository')

exports.findPlanetByName = async function (req, res){
    try {
        let planetName = req.params.name
        let foundPlanet = await findPlanet(planetName)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta encontrado',
                planet: foundPlanet
            })
        }

        let planetsFound = await findPlanetAxios.findPlanetNameAxios(planetName)
        let planet = await repository.savePlanet(planetsFound)
        return res.status(200).send({message: "Planeta encontrado", planet: planet})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.findALLPlanet = async function (req, res){
    try {
        let param = {}
        param.page = req.params.page
        param.skip = 10
        param.limit = page * skip

        let planets = await findAllPlanet(param)
        return res.status(200).send({message: "Planetas encontrados", planet: planets})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

async function findPlanet(planetName){
    try {
        let query = { nome : {$regex: `.*${planetName}.*`} }
        let foundPlanet = await repository.findPlanet(query)
        return foundPlanet
     } catch (error) {
        throw error
    }
}

async function findAllPlanet(param){
    try {
        let foundPlanet = await repository.findAllPlanet(param)
        return foundPlanet
     } catch (error) {
        throw error
    }
}