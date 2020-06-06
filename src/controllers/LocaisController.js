const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const {tipo} = request.query;
        const locais = await connection('locais').where('tipo', tipo);

        return locais.length == 0 ? response.json({message : "Nenhum local foi encontrado!"}) : response.json(locais);  
    
        // return ;
    },

    async create(request, response){

        const {nome, sigla, endereco, cidadeUF, tipo} = request.body;

        try
        {
            const local = await connection('locais').where('nome', nome).first();

            if(local)
            {
                return response.status(403).json({ error: 'Local ja registrado' });
            }
            else
            {
                await connection('locais').insert({
                    nome,
                    sigla,
                    endereco,
                    cidadeUF,
                    tipo
                });
        
                return response.json({text : `Local ${nome} cadastrado com sucesso`}); 
            }
        } catch {
            return response.status(403).json({ error: 'Preencha os campos de forma correta!' });
        }

    },

    async update(request,response){
        const {nome, sigla, endereco, cidadeUF, tipo} = request.body;
        const {localId} = request.query;

        try
        {
            const local = await connection('locais').where('localId', localId).first();
    
            if(!local)
            {
                return response.status(404).json({ error: 'Local not find!' });
            }
            else
            {
                await connection('locais').update({
                    nome : nome,
                    sigla : sigla,
                    endereco : endereco,
                    cidadeUF : cidadeUF,
                    tipo : tipo
                });
        
                return response.json({text : `Local ${nome} atualizado com sucesso`}); 
            } 
        } catch {
            return response.status(403).json({ error: 'Preencha os campos de forma correta!' });
        }
    },

    async delete(request, response){
        const {localId} = request.params;
        try
        {
            const locais = await connection('locais').where('localId', localId).first();
            
            if(locais.localId != localId)
            {
                return response.status(404).json({ error: 'Local Not Found' });
            }
    
            await connection('locais').where('localId', localId).delete();
            return response.status(200).send();
            
        } catch {
            return response.status(403).json({ error: 'Ocorreu erro ao executar essa função!' });
        }
        
    },
}