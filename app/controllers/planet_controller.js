const planetService = require('../service/planet_service')
const repository = require('../repository/planet_repository')
const planetDto = require('../dto/planet_dto')


exports.findPlanetByName = async function (req, res){
    try {
        let planetName = req.params
        let foundPlanet = await planetService.findPlanet(planetName)

        if(foundPlanet){
            let planetReturn = planetDto.returnDto(foundPlanet) 
            return res.status(200).send({
                message: 'Planeta encontrado na base de dados',
                planet: planetReturn
            })
        }
        
        let planetReturn = await planetService.searchPlanetSwapi(planetName, res)
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
            {message: "Planetas encontrados", 
            planet: planets
        })
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.findPlanetById = async function (req, res){
    try {
        let param = req.params
        let planets = await planetService.findPlanet(param)
        let planetReturn = planetDto.returnDto(planets) 
        return res.status(200).send({
            message: "Planeta encontrado", 
            planet: planetReturn
        })
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.savePlanet = async function (req, res){
    try {
        let param = req.params
        let foundPlanet = await planetService.findPlanet(param)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta já cadastrado',
                planet: planetDto.returnDto(foundPlanet)
            })
        }

        let planet = planetService.buildModel(planetsFound)
        await repository.savePlanet(planet)
        return res.status(200).send({message: "Planeta " +planet.nome+ " criado com sucesso!"})
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

exports.removePlanet = async function (req, res){
    try {
        let planet = req.params
        await planetService.findAndRemovePlanet(planet)
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
        let planetReturn = planetDto.returnDto(planetUpdated.planetId, planets) 
        return res.status(200).send({
            message: "Planeta atualizado com sucesso", 
            planet: planetReturn
        })
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}
