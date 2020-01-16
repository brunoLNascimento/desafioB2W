const planet = require('../controllers/planet_controller')

module.exports = function(server) {	
	server.get('/find/:name', planet.findPlanetByName)
	server.get('/findAll/:page', planet.findALLPlanet)
}