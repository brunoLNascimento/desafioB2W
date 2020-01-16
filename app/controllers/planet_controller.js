const findPlanetAxios = require('../service/axios_service')
const repository_Planet = require('../repository/planet_repository')
const  repository = new repository_Planet()

exports.findPlanetByName = async function (req, res){
    try {
        let planetName = req.params
        let foundPlanet = await findPlanet(planetName)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta encontrado',
                planet: foundPlanet
            })
        }

        let planetsFound = await findPlanetAxios.findPlanetNameAxios(planetName.name)
        let planet = buildModel(planetsFound)
        let planetSaved = await repository.savePlanet(planet)
        return res.status(200).send({message: "Planeta encontrado", planet: planetSaved})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.findALLPlanet = async function (req, res){
    try {
        let planets = await findAllPlanet(req.params)
        return res.status(200).send({message: "Planetas encontrados", planet: planets})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.findPlanetById = async function (req, res){
    try {
        let param = req.params
        let planets = await findPlanet(param)
        return res.status(200).send({message: "Planetas encontrados", planet: planets})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.savePlanet = async function (req, res){
    try {
        let param = req.params
        let foundPlanet = await findPlanet(param)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta já cadastrado',
                planet: foundPlanet
            })
        }

        let planet = buildModel(planetsFound)
        await repository.savePlanet(planet)
        return res.status(200).send({message: "Planeta " +planet.nome+ " criado com sucesso!"})
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

async function findPlanet(planet){
    try {
        let query = {}

        if(planet.name)
            query = { nome : {$regex: `.*${planet.name}.*`} }
        else
            query = { planetId : planet.idPlanet }

        let foundPlanet = await repository.findPlanet(query)
        return foundPlanet
     } catch (error) {
        throw error
    }
}

async function findAllPlanet(params){
    try {
        let param = {}
        param.page = params.page
        param.skip = 10
        param.limit = page * skip

        let foundPlanet = await repository.findAllPlanet(param)
        return foundPlanet
     } catch (error) {
        throw error
    }
}

function buildModel(param){
    let planet = new Planet({
        nome: param.name,
        clima: param.climate,
        terreno: param.terrain,
        qtdAparicoesEmFilmes: param.films.length ? param.films.length: param.films
    }); 
    
    return planet
}