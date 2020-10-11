const connection = require('../database/connection');

module.exports = {
    async list(request,response){
        const {userId} = request.body;
        const date = new Date();
        let ano = date.getFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        let stringou = date.toString();
        let horarioAtual = stringou.slice(16, 21);
        console.log(horarioAtual);

        mes++;
        dia = dia.toString();
        mes = mes.toString();
        const zero = "0";

        mes = mes.length == 1 ? zero.concat(mes) : mes;
        dia = dia.length == 1 ? zero.concat(dia) : dia;
        let dataCompleta = (ano + "-" + mes + "-" + dia);
        console.log(dataCompleta);
        console.log(userId);

        let viagens = await connection('viagens')
        .join('locais', 'locais.localId', '=', 'viagens.localId')
        .join('users', 'users.userId', '=', 'viagens.userId')
        .select(['viagens.*', 'locais.nome as nomeDestino', 'users.nome as nomeUsuario'])
        .where('viagens.userId', userId).andWhere('data', '>=', `${ano}-${mes}-${dia}`);

        let viagensFuturas = viagens.filter(viagem => 
            viagem.data > dataCompleta
            );

        let viagensHoje = viagens.filter(viagem => 
            (viagem.data === dataCompleta && viagem.hora > horarioAtual)
            );
            
        viagens = viagensHoje.concat(viagensFuturas);

        return viagens.length == 0 ? response.json({error : "Nenhuma viagem foi encontrada!", codigo : 404}) : response.json(viagens);  
    },

    async create(request,response){
        const { dadosViagem, userId } = request.body;

        let origem = dadosViagem.origem;
        let destino = dadosViagem.destino;
        let data = dadosViagem.data;
        let hora = dadosViagem.hora;
        let qtdPessoas = dadosViagem.qtdPessoas;
        let localId = dadosViagem.localId;

        console.log("Dados da viagem: ", dadosViagem);

        if(origem == "" || destino == "" || data == "" || hora == "" || qtdPessoas == "" )
            return response.json({ error: "Preencha todos os campos!", codigo : 403 });

        try{
            let precoNFormat = dadosViagem.preco;
            const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(precoNFormat);
            // console.log(preco);
            
            await connection('viagens').insert({
                origem,
                destino,
                data,
                hora,
                qtdPessoas,
                preco,
                userId,
                localId,
            })

            return response.json({text : 'Viagem cadastrada com sucesso'}); 
        } catch (err) {
            return response.json({ error: "Falha no registro, tente novamente!", codigo : 403 });
        }
    },

    async delete(request,response){
        const {viagemId} = request.params;
        console.log("ID da viagem: ", viagemId);
        const date = new Date();
        let ano = date.getFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        let stringou = date.toString();
        let horarioAtual = stringou.slice(16, 24);
        
        mes++;

        dia = dia.toString();
        mes = mes.toString();
        ano = ano.toString();

        const zero = "0";

        mes = mes.length == 1 ? zero.concat(mes) : mes;
        dia = dia.length == 1 ? zero.concat(dia) : dia;
        let dataCompleta = ano.concat("-".concat(mes.concat("-".concat(dia))));
        // console.log("Completa: " , dataCompleta);

        try
        {
            const viagem = await connection('viagens').where('viagemId', viagemId).first()
            
            let mesDecrescido = viagem.data.slice(5, 7);
            mesDecrescido = Number(mesDecrescido);
            
            let diaMenosUm = viagem.data.slice(-2);
            diaMenosUm = Number(diaMenosUm);
            
            if(diaMenosUm == 1)
            {
                if(mesDecrescido-1 == 1 || mesDecrescido-1 == 3 || mesDecrescido-1 == 5 || mesDecrescido-1 == 7 || mesDecrescido-1 == 8 || mesDecrescido-1 == 10 || mesDecrescido-1 == 12)
                {
                    // console.log("Mes igual ao de cima: ", mesDecrescido);
                    diaMenosUm = 31
                    mesDecrescido = mesDecrescido - 1;
                }
                else
                {
                    if(mesDecrescido-1 == 2)
                    {
                        // console.log("Mes igual Fevereiro: ", mesDecrescido);
                        diaMenosUm = 28;
                        mesDecrescido = mesDecrescido - 1;
                    }
                    else
                    {
                        // console.log("Mes igual ao q sobrou!:", mesDecrescido)
                        diaMenosUm = 30;
                        mesDecrescido = mesDecrescido - 1;
                    }
                }
            }
            else
            {
                // console.log("Só desci!: ", mesDecrescido)
                diaMenosUm = dia-1;
            }
            mesDecrescido = mesDecrescido.toString();
            mesDecrescido = mesDecrescido.length == 1 ? zero.concat(mesDecrescido) : mesDecrescido;
            let dataDecrescida = ano.concat("-".concat(mesDecrescido.concat("-".concat(diaMenosUm))));
            // console.log("Decrescida: ", dataDecrescida);
            if(viagem)
            {
                // console.log("Data da viagem: ", viagem.data);
                if(viagem.data == dataCompleta)
                {
                    let minutoViagem = viagem.hora.toString().slice(2,5);
                    let quatroHoras = viagem.hora.toString().slice(0, 2);
                    quatroHoras = Number(quatroHoras);
                    quatroHoras = quatroHoras - 4;
                    let horaParametro = quatroHoras.toString().concat(minutoViagem);
                    // console.log("Hora parametro1: ", horaParametro);
                    if(horarioAtual >= horaParametro)
                    {
                        // console.log("casou!1");
                        await connection('viagens').where('viagemId', viagemId).delete();
                        return response.json({message : "Viagem cancelada com sucesso mas com penalidade de 5% pelo prazo faltante de 4hrs para a efetivação da viagem!", codigo : 200});    
                    }
                    else
                    {
                        // console.log("Vai cancelar sem pagar nada1");
                        await connection('viagens').where('viagemId', viagemId).delete();
                        return response.json({message : "Viagem cancelada com sucesso!", codigo : 200});    
                    }
                }
                else
                {
                    if(dataCompleta == dataDecrescida)
                    {
                        if(viagem.hora <= "04:00")
                        {
                            let minutoViagem = viagem.hora.toString().slice(2,5);
                            
                            let quatroHoras = viagem.hora.toString().slice(0, 2);
                            quatroHoras = Number(quatroHoras);
                            quatroHoras = 4 - quatroHoras;
                            
                            let horaParametro = (24 - quatroHoras).toString().concat(minutoViagem);
                            // console.log("Hora parametro2: ", horaParametro);
                            if(horarioAtual >= horaParametro)
                            {
                                // console.log("casou!2");
                                await connection('viagens').where('viagemId', viagemId).delete();
                                return response.json({message : "Viagem cancelada com sucesso mas com penalidade de 5% pelo prazo faltante de 4hrs para a efetivação da viagem!", codigo : 200});    
                            }
                            else
                            {
                                // console.log("Vai cancelar sem pagar nada2");
                                await connection('viagens').where('viagemId', viagemId).delete();
                                return response.json({message : "Viagem cancelada com sucesso!", codigo : 200});    
                            }
                        }
                        else
                        {
                            // console.log("Quase em");
                            await connection('viagens').where('viagemId', viagemId).delete();
                            return response.json({message : "Viagem cancelada com sucesso!", codigo : 200});    
                        }
                    }
                    else
                    {
                        // console.log("Why even bother?");
                        await connection('viagens').where('viagemId', viagemId).delete();
                        return response.json({message : "Viagem cancelada com sucesso!", codigo : 200});    
                    }
                }
            }
            else
            {
                return response.json({ error: 'Viagem não encontrada!', codigo : 404 });
            }

        } catch {
            return response.json({ error: 'Erro ao cancelar viagem, por favor tente novamente' , codigo : 403});
        }
    },
};