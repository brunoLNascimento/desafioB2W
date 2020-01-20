const app = require('../app');
const mongoose = require('mongoose');
const request = require('supertest');
const config = require('../app/config/database');

mongoose.connect(config.db.uri, config.db.option);

const planetMakemake = {
    terrain: "plano",
    climate: "seco",
    films: 5,
    name: "Makemake"          
}

const planetToUpdate = {
    planetId:'1414',
    name:'Haumea',
}

const planetUpdateClimateAndFilms = {
    name: "Makemake",
    planetId:'1414',
    climate: "tropical",
    films: 14,
}

const invalidPlanet = {
    terrain: "plano",
    climate: "seco",
    films: 5,
    planetId:'9999999999999',
    name: "1589561321698756123",
    page: 0,
    invalidPage: 999          
}


describe( 'Testando api de planetas', () => {
    let db = mongoose.connect(config.db.uri)
    setTimeout( function () {
        db.close()
      }, 2000);

    it('#Criando um novo planeta, sem passar os parametros', done => {
    request(app)
        .post(`/planet`)
        .send()
        .expect('Content-Type',/json/)
        .timeout(2000)
        .end(done, console.log(done))
    });

    it('#Criando um novo planeta', done => {
        request(app)
            .post(`/planet`)
            .send(planetMakemake)
            .expect('Content-Type',/json/)
            .timeout(2000)
            .end(done)
    });


    it('#Consultando planeta pelo id', done => {
        request(app)
            .get(`/findById/${planetToUpdate.planetId}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando planeta pelo nome', done => {
        request(app)
            .get(`/find/${planetToUpdate.name}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando planeta pelo nome inválido', done => {
        request(app)
            .get(`/find/${invalidPlanet.name}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando planeta pelo id inválido', done => {
        request(app)
            .get(`/findById/${invalidPlanet.planetId}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando todos os planetas', done => {
        request(app)
            .get(`/findAll/${invalidPlanet.page}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando todos os planetas, passando page inexistente', done => {
        request(app)
            .get(`/findAll/${invalidPlanet.invalidPage}`)
            .timeout(2000)
            .end(done);
    });

    it('#Consultando todos os planetas que contem a letra A', done => {
        request(app)
            .get(`/findAll/A`)
            .timeout(2000)
            .end(done);
    });

    it('#Alterando Clima e quantidades de participações do filme', done => {
        request(app)
            .put(`/planet`)
            .send(planetUpdateClimateAndFilms)
            .timeout(2000)
            .end(done)
    });

    it('#Alterando nome do Planeta', done => {
        request(app)
            .put(`/planet`)
            .send(planetToUpdate)
            .timeout(2000)
            .end(done)
    });


    it('#Tentando criar um planeta já existente', done => {
        request(app)
            .post(`/planet`)
            .send(planetToUpdate.name)
            .timeout(2000)
            .end(done)
    });

    it('#Removendo um planeta', done => {
        request(app)
            .delete(`/planetName/${planetMakemake.name}`)
            .timeout(4000)
            .end(done);
    });

    it('#Tentando Remover um planeta com id inválido', done => {
        request(app)
            .delete(`/planetName/${planetMakemake.name}`)
            .timeout(2000)
            .end(done);
    });
})