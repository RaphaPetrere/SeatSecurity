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

        mes = mes.length ? zero.concat(mes) : mes;
        dia = dia.length ? zero.concat(dia) : dia;
        // let dataCompleta = (ano + "-" + mes + "-" + dia + " ");

        const viagens = await connection('viagens').where('userId', userId).andWhere('data', '>', `${ano}-${mes}-${dia}`);

        return viagens.length == 0 ? response.json({message : "Nenhuma viagem foi encontrada!"}) : response.json(viagens);  
    },

    async create(request,response){
        const { userId, localId } = request.query;
        const { origem, data, hora, qtdPessoas } = request.body;

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
            return response.status(403).json({ error: `${err}` });
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
                return response.status(200).send();
            }
            else
            {
                return response.status(404).json({ error: 'Viagem Not Found' });
            }

        } catch {
            return response.status(403).json({ error: 'Ocorreu erro ao executar essa função!' });
        }
    },
};