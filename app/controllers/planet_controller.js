const findPlanetAxios = require('../service/axios_service')
const repository = require('../repository/planet_repository')
const planetDto = require('../dto/planet_dto')
const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

exports.findPlanetByName = async function (req, res){
    try {
        let planetName = req.params
        let foundPlanet = await findPlanetToAxios(planetName)

        if(foundPlanet){
            let planetReturn = planetDto.returnDto(foundPlanet) 
            return res.status(200).send({
                message: 'Planeta encontrado',
                planet: planetReturn
            })
        }

        let planetsFound = await findPlanetAxios.findPlanetNameAxios(planetName.name)
        let planet = buildModel(planetsFound)
        let planetSaved = await repository.savePlanet(planet)
        let planetReturn = planetDto.returnDto(planetSaved) 
        return res.status(200).send({
            message: "Planeta encontrado", 
            planet: planetReturn
        })
    } catch (error) {
        return res.status(500).send({message: error})        
    }
}

exports.findALLPlanet = async function (req, res){
    try {
        let planets = await findAllPlanet(req.params)
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
        let planets = await findPlanet(param)
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
        let foundPlanet = await findPlaneToAxios(param)

        if(foundPlanet){
            return res.status(200).send({
                message: 'Planeta já cadastrado',
                planet: planetDto.returnDto(foundPlanet)
            })
        }

        let planet = buildModel(planetsFound)
        await repository.savePlanet(planet)
        return res.status(200).send({message: "Planeta " +planet.nome+ " criado com sucesso!"})
    } catch (error) {
        return res.status(400).send({message: error})        
    }
}

async function findPlanet(planet){
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
}

async function findPlanetToAxios(planet){
    try {
        let query = {}
        let foundPlanet = {}

        if(planet.name)
            query = { nome : {$regex: `.*${planet.name}.*`} }
        else
            query = { planetId : planet.idPlanet }

        return foundPlanet = await repository.findPlanetAxios(query)
       
     } catch (error) {
        throw error
    }
}

async function findAllPlanet(params){
    try {
        let param = {}
        let foundPlanet =  {}
        
        param.page = parseInt(params.page)
        param.limit = 10
        param.skip = param.page * param.limit

        return foundPlanet = await repository.findAllPlanet(param)
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