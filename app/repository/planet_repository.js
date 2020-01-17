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
        return await Planet.findOne(query, () => {
            }).then( res => {
                return res
            }).catch(error => {
                throw "Erro: " +error
            })
    },

    async findAndRemovePlanet(query){
        return await Planet.findOneAndRemove(query, () => {
            }).then( res => {
                return foundPlanet = res
            }).catch(error => {
                throw "Erro: " +error
            })
    },

    async findAllPlanet(param){
        return await Planet.find( () => {
            }).limit(param.limit).skip(param.skip)
            .then( res => {
                if(res.length){
                    return res
                }else{
                    throw 'Nenhum planeta encontrado para a sua busca!'
                }
            }).catch(error => {
                throw "Erro: " +error
            })
    },

    async removePlanet(query){
        return await Planet.deleteOne(query, () => {
            }).then( response => {
                return response
            }).catch(error => {
                throw "Erro: " +error
            })
    },
    
    async updatePlanet(query, setUpdate){
        return await Planet.update(query, { $set: setUpdate }, () => {
            }).then( response => {
                return response
            }).catch(error => {
                throw "Erro: " +error
            })
    }

}