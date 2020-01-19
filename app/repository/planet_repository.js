const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');
const config = require('../config/dataBase')

module.exports = {
    async savePlanet(planet){
        return new Promise(async (resolve, reject) =>{
            await planet.save( (err, response) => {
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            })
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
        return new Promise(async (resolve, reject) =>{
            return await Planet.findOneAndRemove(query, (err, response) => {
                if(err){
                    reject(err)
                }
                if(response){
                    resolve(response)
                }else{
                    reject('Nenhum planeta encontrado!')
                }
            })
        })
    },

    async findAllPlanet(param){
        return await Planet.find(param.query, () => {
            }).limit(config.limit.items).skip(param.skip)
            .then( res => {
                    return res
            }).catch(error => {
                throw error
            })
    },
    
    async updatePlanet(setUpdate){
        return await Planet.update( { planetId : setUpdate.planetId }, { $set: setUpdate }, () => {
            }).then( response => {
                return response
            }).catch(error => {
                throw "Erro: " +error
            })
    }

}