const BookController = require('../controllers/BookController')
const books = require('./books');

module.exports = (app) => {
    // welcome message
    app.get('/', (req, res) => {
        res.send('Welcome to our book store');
    });
    
    // get books from ice and fire API
    app.get('/api/external-books', BookController.externalBooks)
    
    app.use('/api/v1/books', books);
    
}