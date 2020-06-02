const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async get(request, response){
        const {input} = request.query;
        const users = await connection('users').where('email', input).orWhere('cpf', input).select('*').first()
        if(!users)
        {
            return response.status(404).json({ error: 'User Not Found' });
        }
        else
        {
            return response.json(users);
        }
        
    },

    async create(request, response){
        const {email, cpf, nome, senha} = request.body;

        const auth = crypto.randomBytes(4).toString('HEX');

        try
        {
            const users = await connection('users').where('email', email).orWhere('cpf', cpf).select('*')
    
            if(users.length != 0)
            {
                return response.status(403).json({ error: 'Usuario ja existe' });
            }
            else
            {
                await connection('users').insert({
                    email,
                    cpf,
                    senha,
                    nome,
                });
        
                return response.json({text : `Olá ${nome}, seja bem vindo ao SeatSecurity, ${auth}`});            
            }
        } catch {
            return response.status(403).json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!'});
        }
    },

    async delete(request, response){
        const {id} = request.params;
        const users = await connection('users').where('userId', id).first();
        
        if(users.userId != id)
        {
            return response.status(404).json({ error: 'User Not Found' });
        }

        await connection('users').where('userId', id).delete();
        return response.status(200).send();
        
    },

    async update(request, response){
        const id = request.headers.authorization;
        const { nome, email, senha} = request.body;
        const dataAtual = Date();
        try
        {
            const users = await connection('users').where('userId', id).first();
            
            if(users.userId != id)
            {
                return response.status(404).json({ error: 'User Not Found' });
            }
    
            await connection('users').where('userId', id).update({ 
                nome : nome,
                email : email,
                senha : senha,
                updated_at : dataAtual,
            });
            return response.status(200).json({message : 'Usuario atualizado com sucesso!'});
        } catch {
            return response.status(403).json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!'});
        }
        
    },
}