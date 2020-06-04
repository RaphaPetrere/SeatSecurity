const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const id = request.headers.authorization;
        const { nomeCartao, numCartao } = request.body;
        if(nomeCartao != undefined)
        {
            try
            {
                const cartao = await connection('cartoes').where('numCartao', numCartao);
                
                
                if(cartao.length != 0)
                {
                    return response.status(403).json({ error: 'Cartão ja registrado' });
                }
                else
                {
                    await connection('cartoes').insert({
                        numCartao,
                        nomeCartao,
                        userId : id,
                    });
                    return response.json({text : `Cartão de número ${numCartao} cadastrado com sucesso`});
                }
            } catch {
                return response.status(403).json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!'});
            }
        }
        else
        {
            return response.status(403).json({error : 'Preencha os campos corretamente!'});
        }

        
    },

    async delete(request, response){
        const {numCartao} = request.params;
        const id = request.headers.authorization;
        const cartao = await connection('cartoes').where('userId', id).andWhere('numCartao', numCartao);
        
        if(cartao.length == 0)
        {
            return response.status(404).json({ error: 'Cartão Not Found' });
        }

        await connection('cartoes').where('userId', id).andWhere('numCartao', numCartao).delete();
        return response.status(200).send();
        
    },

    async list(request, response){
        const {userId} = request.query;
        const cartoes = await connection('cartoes').where('userId', userId);
    
        return response.json(cartoes);
    },
}