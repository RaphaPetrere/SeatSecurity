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
                user: "contatoseats@gmail.com",
                pass: "SeatSecurity123"
            }
        });
        const viagem = await connection('viagens')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .where('viagemId', viagemId)
        .select(['viagens.*', 'users.nome as nomeUsuario', 'users.email as emailUsuario'])
        .first();
        
        let motoristas = ["Chen", "Mateus", "Luiz", "Sunny", "Jennie", "Nako", "Mr.SM", "Yang Hyunsuk", "JYP - The Asian Soul"];
        let numero = Math.floor(Math.random() * 10);
        console.log(numero);
        let escolhido = motoristas[numero];
        try
        {
            transporter.sendMail({
                from: "Seat Security <contatoseats@gmail.com>",
                to: "contatoseats@gmail.com",
                subject : "Passagem por email",
                text : `Olá ${viagem.nomeUsuario}, segue os detalhes da sua proxima viagem: 
                Origem : ${viagem.origem}
                Destino : ${viagem.destino}
                Data e hora : ${viagem.data} - ${viagem.hora}
                Quantidade de Pessoas: ${viagem.qtdPessoas}
                Preço: ${viagem.preco}
                Motorista: ${escolhido}.
                A equipe da Seat Security agradece a preferencia, faça uma boa viagem e volte sempre!`,
            }).then(message => {
                console.log(message);
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