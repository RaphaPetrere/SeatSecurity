const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const { userId } = request.query;
        const viagens = await connection('viagens').where('userId', userId)

        return viagens.length == 0 ? response.json({message : "Nenhuma viagem foi encontrada!"}) : response.json(viagens);  
    },

    async create(request,response){
        const { userId, localId } = request.query;
        const { origem, data, hora, qtdPessoas } = request.body;

        try{
            const local = await connection('locais').where('localId', localId).first();
            const destino = local.endereco;

            const precoNFormat = qtdPessoas * 100;
            console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco));
            const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoNFormat);

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
        } catch {
            return response.status(403).json({ error: 'Preencha os campos de forma correta!' });
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