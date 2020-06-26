const nodemailer = require('nodemailer');
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response){

        const {email} = request.body;
        const cryptoSenha = crypto.randomBytes(4).toString('HEX');

        console.log("email: ", email);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "contatoseats@gmail.com",
                pass: "SeatSecurity123"
            }
        });
        try
        {
            transporter.sendMail({
                from: "Seat Security <contatoseats@gmail.com>",
                to: email,
                subject : "Esqueci minha Senha",
                text : `Olá ${email}, vimos que você solicitou a troca de senha, esta é a sua nova senha: ${cryptoSenha}`,
            }).then(async(message) => {
                console.log(message);
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
                await connection('users').where('email', email).update({ 
                        senha : cryptoSenha,
                        updated_at : dataCompleta,
                    });
                return response.json({text : `Senha enviada com sucesso!`, codigo : 200}); 
            }).catch(err => {
                console.log(err);
                return response.json({ error: err, codigo : 403 });
            })
        } catch {
            return response.json({ error: 'Preencha os campos de forma correta!', codigo : 403 });
        }

    },
}