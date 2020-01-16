const mongoose = require('mongoose')
const Planet = mongoose.model('Planet');

async function savePlanet(planet){
    try {

        var planet = new Planet({
            nome: planet.name,
            clima: planet.climate,
            terreno: planet.terrain,
            qtdAparicoesEmFilmes: planet.films.length
        });

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

async function findPlanet(query){
    try {
        return await Planet.findOne(query, (err, response) => {
            if(err){
                throw err
            }else{
                return response
            }
        })
    } catch (error) {
        return error    
    }
}


function buildDTO(){

}

module.exports = { savePlanet, findPlanet }