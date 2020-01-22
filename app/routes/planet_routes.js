const planet = require('../controllers/planet_controller')

module.exports = function(server) {	
	server.get('/find/:name/', planet.findPlanetByName)
	server.get('/findAll/:page/:name?', planet.findALLPlanet)
	server.get('/findById/:planetId', planet.findPlanetById)
	server.post('/planet', planet.savePlanet)
	server.delete('/planet/:planet', planet.removePlanet)
	server.put('/planet/', planet.updatePlanet)
}