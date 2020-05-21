require('dotenv').config()
// get the test credentials
process.env.NODE_ENV="test"
process.env.DB_NAME=process.env.TEST_DB_NAME
process.env.DB_USER=process.env.TEST_DB_USER
process.env.DB_PASSWORD=process.env.TEST_DB_PASSWORD