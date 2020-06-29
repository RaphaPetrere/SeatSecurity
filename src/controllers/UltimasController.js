const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const {userId} = request.body;
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
        let dataCompleta = (ano + "-" + mes + "-" + dia);
        console.log(dataCompleta);
        console.log(userId);

        let viagens = await connection('viagens')
        .join('locais', 'locais.localId', '=', 'viagens.localId')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .select(['viagens.*', 'locais.nome as nomeDestino', 'users.nome as nomeUsuario'])
        .where('viagens.userId', userId).andWhere('data', '<=', `${ano}-${mes}-${dia}`);

        let viagensPassadas = viagens.filter(viagem => 
            viagem.data < dataCompleta
            );

        let viagensHoje = viagens.filter(viagem => 
            (viagem.data === dataCompleta && viagem.hora < horarioAtual)
            );
            
        viagens = viagensPassadas.concat(viagensHoje);

        return viagens.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagens);  
    },
}