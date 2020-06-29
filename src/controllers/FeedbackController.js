// const connection = require('../database/connection');
const nodemailer = require('nodemailer');

module.exports = {
    async create(request, response){

        const {subject, text} = request.body;
        console.log("subject: ", subject);
        console.log("Texto: ", text);
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
                to: "contatoseats@gmail.com",
                subject,
                text,
            }).then(message => {
                console.log(message);
                return response.json({text : `Feedback enviado com sucesso!`, codigo : 200}); 
            }).catch(err => {
                console.log(err);
                return response.json({ error: "Erro ao enviar mensagem", codigo : 403 });
            })
        } catch {
            return response.json({ error: 'Preencha os campos de forma correta!', codigo : 403 });
        }

    },
}