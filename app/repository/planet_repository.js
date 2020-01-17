const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

module.exports = {
    async savePlanet(planet){
        return await planet.save( () => {
            }).then( response => {
                return response
            }).catch( error => {
                throw error
            })
    },

    async findPlanet(query){
        let foundPlanet = {}
        return await Planet.findOne(query, () => {
            }).then( res => {
                return foundPlanet = res
            }).catch(error => {
                throw "Erro: " +error
            })
    },

    async findAllPlanet(param){
        let foundAllPlanet = {} 
        return await Planet.find( () => {
            }).limit(param.limit).skip(param.skip)
            .then( res => {
                if(res.length){
                    return foundAllPlanet = res
                }else{
                    throw 'Nenhum planeta encontrado para a sua busca!'
                }
            }).catch(error => {
                throw "Erro: " +error
            })
    }

}