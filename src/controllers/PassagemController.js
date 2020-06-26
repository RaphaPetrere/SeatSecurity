const connection = require('../database/connection');
const nodemailer = require('nodemailer');

module.exports = {
    async create(request, response){

        const { viagemId } = request.body;
        
        console.log("ID Viagem: ", viagemId);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "carrinhovirtual2019@gmail.com",
                pass: "carrinho2019"
            }
        });
        const viagem = await connection('viagens')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .where('viagemId', viagemId)
        .select(['viagens.*', 'users.nome as nomeUsuario', 'users.email as emailUsuario'])
        .first();

        try
        {
            transporter.sendMail({
                from: "Raffa Moreira Mano <carrinhovirtual2019@gmail.com>",
                to: "carrinhovirtual2019@gmail.com",
                subject : "Passagem por email",
                text : `Olá ${viagem.nomeUsuario}, segue os detalhes da sua proxima viagem: 
                Origem : ${viagem.origem}
                Destino : ${viagem.destino}
                Data e hora : ${viagem.data} - ${viagem.hora}
                Quantidade de Pessoas: ${viagem.qtdPessoas}
                Preço: ${viagem.preco}.
                A equipe da Seat Security agradece a preferencia, faça uma boa viagem e volte sempre!`,
            }).then(message => {
                // console.log(message);
                return response.json({text : `Email enviado com sucesso!`, codigo : 200}); 
            }).catch(err => {
                console.log(err);
                return response.json({ error: err, codigo : 403 });
            })
        } catch {
            return response.json({ error: 'Erro ao enviar o email!', codigo : 403 });
        }

    },
}