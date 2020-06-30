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
        let carros = [{
            veiculo : "Mercedes-Benz 413 Van", cor : "Cinza", placa : "ABC-1234"},
            {veiculo : "Ford Transit", cor : "Azul", placa : "HSS-4938"},
            {veiculo : "Citroën Jumpy Minibus", cor : "Branco", placa : "MZC-6288"},
            {veiculo : "Peugeot Expert Minibus", cor : "Gelo", placa : "GPQ-5880"},
            {veiculo : "Mercedes Sprinter 415 Van", cor : "Verde", placa : "NAF-5383"},
            {veiculo : "Fiat Ducato Minibus Comfort", cor : "Vinho", placa : "NEM-7145"},
            {veiculo : "Renault Master Minibus", cor : "Branco", placa : "JYZ-2672"},
            {veiculo : "Mercedes-Benz Sprinter 313", cor : "Preto", placa : "MWZ-9040"},
            {veiculo : "Peugeot Boxer", cor : "Cinza", placa : "MGK-1121"},
            {veiculo : "Fiat Ducato Combinato", cor : "Vinho", placa : "JUZ-7938"
        }];
        let numero = Math.floor(Math.random() * 10);
        console.log(numero);
        let motoristaEscolhido = motoristas[numero];
        let veiculoEscolhido = carros[numero];
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
                Motorista: ${motoristaEscolhido}
                Veiculo: ${veiculoEscolhido.veiculo}
                Cor: ${veiculoEscolhido.cor}
                Placa: ${veiculoEscolhido.placa}.
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