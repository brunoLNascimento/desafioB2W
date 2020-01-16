module.exports.returnDto = function(param){   
    this.nome = param.name,
    this.clima = param.climate,
    this.terreno = param.terrain,
    this.qtdAparicoesEmFilmes = param.films.length ? param.films.length: param.films
}

