# SeatSecurity
<div align="center">
  <img src="https://github.com/RaphaPetrere/SeatSecurity/blob/frontend/src/assets/cadeadoRoxoFechado.png" width="100px"></img>  
  <p>Aplicação desenvolvida em NodeJS e ReactJS com foco em transporte de grupos com vans e micro-ônibus com fins acadêmicos.</p>
</div>

### Sumário
- Introdução
- Link para utilização do sistema hospedado
- Preparando o ambiente para aplicação local
- Como utilizar
- Agradecimentos

### Introdução

O SeatSecurity surgiu da visão de 3 estudantes universitários da FATEC Antônio Russo, Raphael Cardoso Petrére, Milena Franco e Miguel Costa de Morais, sobre a necessidade de um método de transporte de grupos com um baixo custo para o usuário e serviço de qualidade visto que o mercado não possui uma alternativa para esse nicho, mesmo após grandes eventos como a Copa do Mundo de 2014, os Jogos Olímpicos Rio 2016, Carnaval de São Paulo e Rio de Janeiro, Amostra Cultural e entre outros. 

### Link para utilização do sistema hospedado
[SeatSecurity hospedado na Heroku](https://seatsecurity-frontend.herokuapp.com/).

### Preparando o ambiente para aplicação local
- #### Backend

Visto que o backend da aplicação é desenvolvida em NodeJS, será necessário baixar e instalar o `Node` e `npm` para a execução de tal aplicação.
[Node pode ser encontrado aqui](https://nodejs.org/en/)

Após a instalação do Node, execute os seguintes comandos para verificar as versões instaladas:
```terminal
  node -v
```
_recomendamos versões a partir da 12.16.3_
```terminal
  npm -v
```
_recomendamos versões a partir da 6.14.4_

Se as versões se encontram nas recomendações, execute o seguinte comando para instalar as bibliotecas utilizadas:
```terminal
  npm install
```

Se tudo correr como o esperado, execute o seguinte comando para a execução do backend da aplicação: 
```terminal
  npm start
```

- #### Frontend

Para o frontend da aplicação desenvolvido em ReactJS, utilizamos além do npm, o `yarn`, a instalção do yarn é necessária para a execução de tal aplicação.
[Yarn pode ser encontrado aqui](https://yarnpkg.com/getting-started/install)

Após a instalação do Yarn, execute o seguinte comando para verificar a versão instalada:
```terminal
  yarn -v
```
_recomendamos versões a partir da 1.22.4_

Se a versão se encontra nas recomendações, execute os seguintes comandos para instalar as bibliotecas utilizadas:
```terminal
  yarn install
```
```terminal
  npm install
```

Se tudo correr como o esperado, execute o seguinte comando para a execução do frontend da aplicação: 
```terminal
  yarn start
```

Ao ser executado esse comando, deverá abrir uma guia no navegador com a url localhost:3000 .

### Como utilizar

Ao abrir a aplicação, você se deparará com a seguinte mensagem: 
> Para uma melhor experiência, acesse pelo celular.

Caso não seja possível acessar pelo celular, será necessário utilizar o modo responsivo do navegador

  - Para acessar o modo responsivo no Firefox, pressione F12 e clique no icone no canto superior direito com formato de aparelhos móveis ao lado dos 3 pontos, ao clicar nesse icone, selecione um tipo de aparelho móvel, porquê o modo responsivo não é reconhecido pela aplicação.
  
  - Para acessar o modo responsivo no Chrome, pressione F12 e clique no icone com formato de aparelhos móveis ao lado do icone de seta, ao clicar nesse icone, selecione um tipo de aparelho móvel, porquê o modo responsivo não é reconhecido pela aplicação.
  
Agora é necessário atualizar a pagina para utilizar a aplicação.

### Agradecimentos

Gostariamos de agradecer à todos que nos apoiaram e ajudaram ao decorrer do curso e do desenvolvimento dessa aplicação, esta aplicação foi muito importante para o desenvolvimento pessoal e aprendizado de tecnologias muito utilizadas no mercado.

Em caso de algum problema, por favor informar na aba de issues.

Atenciosamente, equipe do **SeatSecurity**.
