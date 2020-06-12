const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async get(request, response){
        const users = await connection('users')
        if(!users)
        {
            return response.json({ error: 'Usuário não encontrado!', codigo : 404 });
        }
        else
        {
            return response.json(users);
        }
        
    },

    async create(request, response){
        const {email, cpf, nome, senha, rsenha} = request.body;

        const auth = crypto.randomBytes(4).toString('HEX');

        if(email == ""|| cpf == ""|| nome == ""|| senha == "" || rsenha == "")
            return response.json({error : 'Preencha os campos corretamente!', codigo: 403 });

        try
        {
            const users = await connection('users').where('email', email).orWhere('cpf', cpf).first();
    
            if(users)
            {
                return response.json({ error: 'Usuario ja existe', codigo: 403 });
            }
            else
            {
                if(senha != rsenha)
                {
                    // console.log(senha, rsenha);
                    return response.json({error : 'Campos de senha não condizem!', codigo: 403 });
                }

                await connection('users').insert({
                    email,
                    cpf,
                    senha,
                    nome,
                });
        
                return response.json({message : `Conta de nome ${nome} cadastrada com sucesso!, ${auth}`, codigo: 200 });            
            }
        } catch {
            // return response.status(403).json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!'});
            return response.json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!', codigo: 403 });
        }
    },

    async delete(request, response){
        const {id} = request.params;
        const users = await connection('users').where('userId', id).first();
        
        if(users.userId != id)
        {
            return response.json({ error: 'Usuário não encontrado!', codigo : 404 });
        }

        await connection('users').where('userId', id).delete();
        return response.status(200).send();
        
    },

    async update(request, response){
        // const userId = request.headers.authorization;
        const { userId, nome, email, senha} = request.body;
        const date = new Date();
        let ano = date.getFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        let dataString = date.toString();
        let horarioAtual = dataString.slice(16, 24);

        mes++;
        dia = dia.toString();
        mes = mes.toString();
        const zero = "0";

        mes = mes.length ? zero.concat(mes) : mes;
        dia = dia.length ? zero.concat(dia) : dia;
        
        let dataAtual = (ano + "-" + mes + "-" + dia + " ");
        let dataCompleta = dataAtual.concat(horarioAtual);
        // console.log(userId, nome, email, senha)
        try
        {
            const user = await connection('users').where('userId', userId).first();
            if(!user)
            {
                return response.json({ error: 'Usuário não encontrado!', codigo : 404 });
            }
    
            await connection('users').where('userId', userId).update({ 
                nome : nome != "" ? nome : user.nome,
                email : email != "" ? email : user.email,
                senha : senha != "" ? senha: user.senha,
                updated_at : dataCompleta,
            });
            return response.status(200).json({message : 'Usuario atualizado com sucesso!'});
        } catch {
            return response.status(403).json({error : 'Ocorreu algum erro, cheque os campos e tente novamente!'});
        }
        
    },
}