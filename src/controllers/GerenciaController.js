const { request } = require("express");

const connection = require('../database/connection');
module.exports = {
    async list(request,response){
        const { mes, ano } = request.body;

        let zero = "0"
        let mesAtual = mes.toString();
        mesAtual = mesAtual.length == 1 ? zero.concat(mesAtual) : mesAtual
        let anoAtual = ano.toString();

        if(anoAtual.length != 4 || mesAtual.length > 2 || mesAtual.length < 1)
            return response.json({error : "Dados inválidos! Checar os campos novamente", codigo : 403})
        
            // console.log(anoAtual.length, mesAtual.length);
        
        const viagens = await connection('viagens')
        .join('locais', 'locais.localId', '=', 'viagens.localId')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .select(['viagens.*', 'locais.nome as nomeDestino', 'users.nome as nomeUsuario'])
        .whereBetween('data', [`${ano}-${mesAtual}-01`, `${ano}-${mesAtual}-31`]);

        return viagens.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagens);  
    },
}