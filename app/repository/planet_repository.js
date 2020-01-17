const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

module.exports = {
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
    },

    async findPlanet(query){
        let found = {}
        return await Planet.findOne(query, () => {
            }).then( res => {
                if(res){
                    found = res
                }else{
                    throw 'Nenhum planeta encontrado para a sua busca!'
                }
            }).catch(error => {
                throw "Erro: " +error
            })
    },

    async findPlanetAxios(query){
        let found = {}
        return await Planet.findOne(query, () => {
            }).then( res => {
                if(res){
                  return  found = res
                }else{
                    return found = res
                }
            }).catch(retorno => {
                throw retorno
            })
    },

    async findAllPlanet(param){
        let found = {} 
        return await Planet.find( () => {
            }).limit(param.limit).skip(param.skip)
            .then( res => {
                if(res.length){
                    return found = res
                }else{
                    throw 'Nenhum planeta encontrado para a sua busca!'
                }
            }).catch(error => {
                throw "Erro: " +error
            })
    }

}