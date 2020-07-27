const sequelize = require("sequelize")
const connection = require("../database/connection")

const Transacao = connection.define("Transacao", {
    year: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    month: {
        type: sequelize.STRING,
        allowNull: false
    },
    data: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    },
    value: {
        type: sequelize.INTEGER,
        allowNull: false
    }

})




module.exports = Transacao;