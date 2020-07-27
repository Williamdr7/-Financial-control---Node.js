const Sequelize = require("sequelize");
const connection = new Sequelize('financeiro', 'root', 'fortcamp0100', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection;