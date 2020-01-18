const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

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
        return await Planet.find( () => {
            }).limit(param.limit).skip(param.skip)
            .then( res => {
                if(res.length){
                    return res
                }else{
                    throw 'Nenhum planeta encontrado para a sua busca!'
                }
            }).catch(error => {
                throw error
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