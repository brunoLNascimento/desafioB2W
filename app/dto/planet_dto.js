module.exports.returnDto = function(param){   
    let returnDto = {
        nome : param.name ? param.name: param.nome,
        clima : param.climate ? param.climate: param.clima,
        terreno : param.terrain ? param.terrain: param.terreno,
        qtdAparicoesEmFilmes : param.qtdAparicoesEmFilmes ? param.qtdAparicoesEmFilmes: param.films.length
    }
    return returnDto
}