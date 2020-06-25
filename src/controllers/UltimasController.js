const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const [userId] = request.headers.authorization;
        console.log(userId);
        const date = new Date();
        let ano = date.getFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        let stringou = date.toString();
        let horarioAtual = stringou.slice(16, 21);
        console.log(horarioAtual);

        mes++;
        dia = dia.toString();
        mes = mes.toString();
        const zero = "0";

        mes = mes.length == 1 ? zero.concat(mes) : mes;
        dia = dia.length == 1 ? zero.concat(dia) : dia;
        console.log(ano, mes, dia);

        const viagens = await connection('viagens')
        .join('locais', 'locais.localId', '=', 'viagens.localId')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .select(['viagens.*', 'locais.nome as nomeDestino', 'users.nome as nomeUsuario'])
        .where('viagens.userId', userId).andWhere('data', '<=', `${ano}-${mes}-${dia}`).andWhere('hora', '<', `${horarioAtual}`);

        return viagens.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagens);  
    },
}