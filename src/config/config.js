require('dotenv').config()
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    db: {
        database: process.env.DB_NAME || 'aureole',
        user:  process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || '127.0.0.1'
        }
    }
}