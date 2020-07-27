const express = require("express");
const Sequelize = require("sequelize")
const app = express();
const bodyParser = require("body-parser")
const transacaoController = require("./transacoes/transacaoController")
const connection = require("./database/connection")
const Transacao = require("./transacoes/transacao")
const User = require("./user/user")
const userController = require("./user/userController")
const session = require("express-session")

//Banco
connection.authenticate().then(() => {
        console.log("Banco Conectado")
    }).catch((error) => {
        console.log("Erro: " + error)
    })
    //Sessão
app.use(session({
        secret: 'financeirocontroller',
        cookie: { maxAge: 30000 },

    }))
    //Tabelas (Models)
Transacao.sync({ force: false })
User.sync({ force: false })


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static
app.use(express.static("public"))
    //Ejs
app.set("view engine", "ejs")

//Rotas
app.use("/", transacaoController)
app.use("/", userController)

app.listen(8000, () => {
    console.log("Servidor Rodando")
})