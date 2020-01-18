const planetService = require('../service/planet_service')
const repository = require('../repository/planet_repository')


exports.findPlanetByName = async function (req, res){
    try {
        let planetName = req.params
        let foundPlanet = await planetService.findPlanet(planetName)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta encontrado na base de dados',
                planet: foundPlanet
            })
        }
        
        let planetReturn = await planetService.searchPlanetSwapi(planetName)
        return res.status(200).send({
            message: "Planeta encontrado no Swapi e salvo na Base", 
            planet: planetReturn
        })
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.findALLPlanet = async function (req, res){
    try {
        let planets = await planetService.findAllPlanet(req.params)
        return res.status(200).send(
            {message: "Planetas encontrados: " +planets.length, 
            planet: planets
        })
    } catch (error) {
        return res.status(206).send({message: error})        
    }
}

exports.findPlanetById = async function (req, res){
    try {
        let param = req.params
        let planets = await planetService.findPlanet(param)

        if(!planets)
            throw "Nenhum planeta encontrado"

        return res.status(200).send({
            message: "Planeta encontrado", 
            planet: planets
        })
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.savePlanet = async function (req, res){
    try {
        planetService.validateBody(req.body)
        let foundPlanet = await planetService.findPlanet(req.body)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta já cadastrado',
                planet: foundPlanet
            })
        }

        let planet = planetService.buildModel(req.body)
        await repository.savePlanet(planet)
        return res.status(200).send({message: "Planeta " +planet.name+ " criado com sucesso!"})
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.removePlanet = async function (req, res){
    try {
        let planet = req.params
        let deleted = await planetService.findAndRemovePlanet(planet)
        return res.status(200).send({message: "Planeta apagado com sucesso!"})
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.updatePlanet = async function (req, res){
    try {
        let body = req.body
        let planets = await planetService.findPlanet(body.planetId)
        let planetUpdated = planetService.update(planets, body)
        let planet = planetService.buildModel(planetUpdated)
        await repository.updatePlanet(planet)
        return res.status(200).send({
            message: "Planeta atualizado com sucesso", 
            planet: planet
        })
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}
