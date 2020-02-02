const { createConnection } = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
createConnection(process.env.mongoose_uri.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(chalk.red("An error occurred while initializing the database"))
    console.log(chalk.green("Database connected sucessfuly"))
})

module.exports = require("./Schemas");