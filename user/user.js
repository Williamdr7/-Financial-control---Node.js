const sequelize = require("sequelize")
const connection = require("../database/connection")
const Transacao = require("../transacoes/transacao")


const User = connection.define("User", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }

})
User.hasMany(Transacao);
Transacao.belongsTo(User);


module.exports = User;