const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async list(request, response){
        const users = await connection('users').select('*')
        console.log("So where r u?");
    
        return response.json(users);
    },

    async get(request, response){
        const {input} = request.body;
        const users = await connection('users').where('email', input).orWhere('cpf', input).select('*')
        if(users.length == 0)
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

        await connection('users').insert({
            email,
            cpf,
            senha,
            nome,
        });

        return response.json({text : `Olá ${nome}, seja bem vindo ao SeatSecurity, ${auth}`});
    },

    async delete(request, response){
        const {id} = request.params;
        const users = await connection('users').where('userId', id);
        
        if(users[0].userId != id)
        {
            return response.status(404).json({ error: 'User Not Found' });
        }

        await connection('users').where('id', id).delete();
        return response.status(200).send();
        
    },

    async update(request, response){
        const id = request.headers.authorization;
        const { nome, email, senha} = request.body;
        const users = await connection('users').where('userId', id);
        
        if(users[0].userId != id)
        {
            return response.status(404).json({ error: 'User Not Found' });
        }

        await connection('users').where('userId', id).update({ 
            nome : nome,
            email : email,
            senha : senha
        });
        return response.status(200).send();
        
    },
}