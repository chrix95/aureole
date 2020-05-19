const BookController = require('../controllers/BookController')
const ValidationPolicy = require('../policies/ValidationPolicy')

module.exports = (app) => {
    // welcome message
    app.get('/', (req, res) => {
        res.send('Welcome to our book store');
    });
    
    // get books from ice and fire API
    app.get('/api/external-books', BookController.externalBooks)
    app.post('/api/v1/books', ValidationPolicy.create, BookController.create)
    app.get('/api/v1/books', BookController.read)
    app.get('/api/v1/books/:id', BookController.show)
    app.delete('/api/v1/books/:id', BookController.destroy)
    app.patch('/api/v1/books/:id', ValidationPolicy.update, BookController.update)
}