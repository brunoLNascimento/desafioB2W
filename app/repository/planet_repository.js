const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

module.exports = class servicePlanet {
    async savePlanet(planet){
        try {
            await planet.save(function(err, response){
                if(err){
                    throw err
                }
                if(response){
                    return response
                }else{
                    throw "Algo deu errado ao salvar, tente mais tarde!"
                }
            })
        } catch (error) {
            throw error    
        }
    }

    async findPlanet(query){
        try {
            await Planet.findOne(query, (err, response) => {
                if(err){
                    throw "Erro ao consultar planeta: " +err
                }else{
                    return response
                }
            })
        } catch (error) {
            return error    
        }
    }

    async findAllPlanet(param){
        try {
            await Planet.findAll(err, response => {
                if(err){
                    throw "Erro ao consultar planeta: " +err
                }else{
                    return response
                }
            }).limit(param.limit).skip(param.skip)
        } catch (error) {
            return error    
        }
    }
}
//module.exports = { savePlanet, findPlanet, findAllPlanet }