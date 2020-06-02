const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const {tipo} = request.query;
        const locais = await connection('locais').where('tipo', tipo);
    
        return response.json(locais);
    },
}