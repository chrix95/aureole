const express = require('express')
const { sequelize } = require('./models')
const config = require('./config/config')
const helmet = require('helmet')

const app = express()

app.use(express.json()) // accept JSON as body params
app.use(express.urlencoded({ extended: true })) // also permit form urlencoded format
app.use(helmet());

require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    })

module.exports = app;