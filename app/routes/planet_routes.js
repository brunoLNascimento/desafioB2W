const planet = require('../controllers/planet_controller')

module.exports = function(server) {	
	server.get('/find/:name', planet.findPlanetByName)
	server.get('/findAll/:page', planet.findALLPlanet)
	server.get('/findById/:idPlanet', planet.findPlanetById)
	server.post('/savePlanet', planet.savePlanet)
	server.remove('/planet/:idPlanet', planet.removePlanet)
	server.update('/planet/', planet.updatePlanet)
}