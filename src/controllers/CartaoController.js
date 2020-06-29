const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { userId, nomeCartao, numCartao, cvv, validade } = request.body;
        if(nomeCartao == "" || numCartao == "" || cvv == "" || validade == "")
            return response.json({error : 'Preencha os campos corretamente!', codigo : 403});

        console.log("USERID: " + userId, "Nome: " + nomeCartao, "Numero: " + numCartao);
        console.log("cvv: ", cvv, " Validade: ", validade);

        if(nomeCartao != undefined)
        {
            try
            {
                const cartao = await connection('cartoes').where('numCartao', numCartao).first();
                if(cartao != undefined)
                {
                    return response.json({ error: 'Cartão ja registrado', codigo : 403 });
                }
                else
                {
                    if(cvv.length != 3 || validade.length != 5)
                    {
                        return response.json({ error : 'Colocar dados no tamanho requerido!', codigo : 403})
                    }

                    await connection('cartoes').insert({
                        numCartao,
                        nomeCartao,
                        cvv,
                        validade,
                        userId,
                    });
                    return response.json({message : `Cartão de número ${numCartao} cadastrado com sucesso`});
                }
            } catch {
                return response.json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!', codigo : 403});
            }
        }
        else
        {
            return response.json({error : 'Preencha os campos corretamente!', codigo : 403});
        }

        
    },

    async delete(request, response){
        const {numCartao} = request.params;
        const id = request.headers.authorization;
        const cartao = await connection('cartoes').where('userId', id).andWhere('numCartao', numCartao);
        
        if(cartao.length == 0)
        {
            return response.json({ error: 'Cartão Não encontrado', codigo : 404 });
        }

        await connection('cartoes').where('userId', id).andWhere('numCartao', numCartao).delete();
        return response.status(200).send();
        
    },

    async list(request, response){
        const {userId} = request.body;
        console.log(userId);
        const cartoes = await connection('cartoes').where('userId', userId);
    
        return response.json(cartoes);
    },
}