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
                to: "miguelmorais.mcm@gmail.com, milenafranco10@gmail.com",
                subject,
                text,
            }).then(message => {
                console.log(message);
                return response.json({text : `Feedback enviado com sucesso!`, codigo : 200}); 
            }).catch(err => {
                console.log(err);
                return response.json({ error: err, codigo : 403 });
            })
            // const local = await connection('locais').where('nome', nome).first();

            // if(local)
            // {
            //     return response.status(403).json({ error: 'Local ja registrado' });
            // }
            // else
            // {
            //     await connection('locais').insert({
            //         nome,
            //         sigla,
            //         endereco,
            //         cidadeUF,
            //         tipo
            //     });
        
            //     return response.json({text : `Local ${nome} cadastrado com sucesso`}); 
            // }
        } catch {
            return response.status(403).json({ error: 'Preencha os campos de forma correta!' });
        }

    },
}