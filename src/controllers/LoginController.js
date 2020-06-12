const connection = require('../database/connection');

module.exports = {
    async post(request, response) {
        const { email, senha } = request.body;

        if(email == "" || senha == "")
            return response.json({ error : "Preencha os campos corretamente!", codigo : 403 }); 

        const user = await connection('users').where('email', email).select('*').first();

        if(!user) {
            return response.json({ error : "Usuário não encontrado!", codigo : 404 }); 
        }

        if(user.senha != senha)
            return response.json({ error : "Senha errada!", codigo : 403 }); 

        return response.json(user);
    }
}