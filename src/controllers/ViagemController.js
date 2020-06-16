const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const { userId } = request.query;
        const date = new Date();
        let ano = date.getFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        // let stringou = date.toString();
        // let horarioAtual = stringou.slice(16, 24);
        // console.log(horarioAtual);

        mes++;
        dia = dia.toString();
        mes = mes.toString();
        const zero = "0";

        mes = mes.length == 1 ? zero.concat(mes) : mes;
        dia = dia.length == 1 ? zero.concat(dia) : dia;
        // let dataCompleta = (ano + "-" + mes + "-" + dia + " ");
        console.log(ano, mes, dia);

        const viagens = await connection('viagens')
        .join('locais', 'locais.localId', '=', 'viagens.localId')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .select(['viagens.*', 'locais.nome as nomeDestino', 'users.nome as nomeUsuario'])
        .where('viagens.userId', userId).andWhere('data', '>', `${ano}-${mes}-${dia}`);

        return viagens.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagens);  
    },

    async create(request,response){
        const { userId, localId } = request.query;
        const { origem, data, hora, qtdPessoas } = request.body;

        if(origem == "" || data == "" || hora == "" || qtdPessoas == "" )
            return response.json({ error: "Preencha todos os campos!", codigo : 403 });

        try{
            const local = await connection('locais').where('localId', localId).first();
            const destino = local.endereco;

            let precoNFormat = qtdPessoas * 100;
            const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoNFormat);
            // console.log(preco);
            
            await connection('viagens').insert({
                origem,
                destino,
                data,
                hora,
                qtdPessoas,
                preco,
                userId,
                localId,
            })

            return response.json({text : 'Viagem cadastrada com sucesso'}); 
        } catch (err) {
            return response.json({ error: `${err}`, codigo : 403 });
        }
    },

    async delete(request,response){
        const {viagemId} = request.params;
        try
        {
            const viagem = await connection('viagens').where('viagemId', viagemId).first()
            
            if(viagem)
            {
                await connection('viagens').where('viagemId', viagemId).delete();
                return response.json({message : "Viagem cancelada com sucesso!", codigo : 200});
            }
            else
            {
                return response.json({ error: 'Viagem não encontrada!', codigo : 404 });
            }

        } catch {
            return response.json({ error: 'Ocorreu erro ao executar essa função!' , codigo : 403});
        }
    },
};