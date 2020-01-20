const planet = require('../controllers/planet_controller')

module.exports = function(server) {	
	server.get('/find/:name/:page?', planet.findPlanetByName)
	server.get('/findAll/:page', planet.findALLPlanet)
	server.get('/findById/:planetId', planet.findPlanetById)
	server.post('/planet', planet.savePlanet)
	server.delete('/planet/:planetId', planet.removePlanet)
	server.delete('/planetName/:name', planet.removePlanet)
	server.put('/planet/', planet.updatePlanet)
}