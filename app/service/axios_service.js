const connection = require('../config/url_config')
const axios = require('axios')

async function findPlanetNameAxios(planetName){  
    try {
        let urlSwapi = `${connection.url.swapi}?search=${planetName}`
        console.info('Consultando a url: ' +urlSwapi)

        return await axios.get(urlSwapi, { 
                timeout: connection.url.timeout 
            }).then(foundPlanets => {
                if(foundPlanets.data.results.length){
                    var planet = foundPlanets.data.results[0]
                    return planet
                }else{
                    throw 'Nenhum planeta: ' +planetName+ ", foi encontrado!"
                }
            }).catch(error => {
                throw error
        })
    } catch (error) {
        throw error
    }
}

module.exports = { findPlanetNameAxios }