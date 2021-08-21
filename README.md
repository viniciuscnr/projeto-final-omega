# Projeto Final Omega Tech
Projeto final do programa de treinamento da Omega Energia com a Gama Academy.

## Descrição
O projeto envolveu a produção de um website baseado em volta da premissa de mercado da Omega Energia, envolvendo a criação de usuários e a contratação de pacotes de energia elétrica.

### Principais funcionalidades
Realização de cadastro e login de usuários.<br/>
Criação, manipulação e contratação de propostas de compra de energia.<br/>
Restrição de acesso pelos usuários à propostas alheias, podendo interagir apenas com as propostas criadas por si mesmos.<br/>

## Back-end
API Rest baseada em NestJs.
#### Recursos utilizados
O tipo de banco de dados utilizado foi Postgres, com TypeORM para a persistência de dados.<br/>
A segurança (autenticações e autorizações) foi feita através de JWT.<br/>
A documentação da API foi realizada via Swagger.<br/>
#### Hospedagem
A API está hospedada no Heroku e o banco de dados na Amazon Web Service.

## Front-End
Front-end feito com Create-React-App e gerenciador de pacotes Yarn.
#### Recursos utilizados
Foi usado o framework CSS Tailwind e a biblioteca Styled-Components para estilização.<br/>
Gerenciamento de Rotas com o React-Router-Dom e o React-Router.<br/>
Funcionalidades específicas feitas com  React Modal e React-Date-Picker.<br/>
Foram utilizados as ContextsAPIs e os hooks useState, useEffect e useContext.<br/>
#### Hospedagem
O front-end está hospedado no Heroku.

## Integração do front-end com o back-end 
Feita através da biblioteca Axios.

## Equipe e organização de tarefas
#### Homero Galvão
Configuração da base de dados na AWS;<br/>
Configuração das variáveis de ambiente da API no Heroku;<br/>
Criação de classes utilitárias para integração do front-end com o back-end.

#### Filipe Lima
Criação da interface da aplicação;<br/>
Criação do dashboard;<br/>
Criação dos componentes de login (front-end);<br/>
Criação do cadastro (front-end);<br/>
Criação dos modais;<br/>
Criação da Home;<br/>
Listagem das propostas (front-end);<br/>
Criação dos forms (front-end).

#### Vinícius Rebouças
Cadastro, login e manipulação de usuários (back-end);<br/>
Cadastro, login e manipulação de propostas (back-end);<br/>
Relacionamento entre entidades;<br/>
Criação da calculadora de propostas;<br/>
Implementação de autenticação JWT;<br/>
Implementação de autorização (limitar usuários as suas propostas utilizando o JWT);<br/>
Implementação do Swagger;<br/>
Realização do deploy da API no Heroku.

## Opcionais
Os opcionais de extensão de período (oferecimento de benefício de preço de acordo com a extensão do período de uma proposta) e a responsividade em dispositivos móveis foram cumpridos.

## Repositório com o front-end
https://github.com/filipemsl/omega-tech-frontend
