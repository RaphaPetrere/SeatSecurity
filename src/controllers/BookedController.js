const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const { viagemId } = request.body;
        console.log("ViagemID:",viagemId);

        const viagem = await connection('viagens')
        .where('viagemId', viagemId);

        return viagem.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagem);  
    },
}