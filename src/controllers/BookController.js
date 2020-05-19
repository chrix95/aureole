const axios = require('axios');
const db = require('../models/index')
// immport the models
const BookModel = require('../models/Book')
// use models by passing the connection and Sequelize
const Book = BookModel(db.sequelize, db.Sequelize)

module.exports = {
  // fetch books from external API
  async externalBooks (req, res) {
    // set the main URL
    let url = "https://www.anapioficeandfire.com/api/books";
    if (req.query.name) { 
      url = url + "?name=" + req.query.name
    }
    try {
      const response = await axios.get(url)
      const data = response.data
      const result = data.map(item => ({
        name: item.name,
        isbn: item.isbn,
        authors: item.authors,
        number_of_pages: item.numberOfPages,
        publisher: item.publisher,
        country: item.country,
        release_date: item.released.substr(0, 10)
      }))
      // return response to user
      return res.status(200).send({
        status_code: 200,
        status: "success",
        data: result
      })
    } catch (error) {
      // catch any error and return error
      return res.status(500).send({
        status_code: 500,
        status: error.message
      })
    }
  },

  // create a new book
  async create (req, res) {
    try {
      // const book =  { 
      //   name: req.body.name, 
      //   isbn: req.body.isbn, 
      //   authors: req.body.authors,
      //   country: req.body.country,
      //   number_of_pages: req.body.number_of_pages,
      //   publisher: req.body.publisher,
      //   release_date: req.body.release_date
      // }

      // the code above can further be optimize to 
      const book =  { name, isbn, authors, country, number_of_pages, publisher, release_date } = req.body;
    
      await Book.create(book)
      return res.status(200).send({ 
        status_code: 201,
        status: 'success',
        data: {
          book: book
        }
      })
    } catch (error) {
      // error occured
      return res.status(500).send({ 
        status_code: 500,
        status: 'Error occured while creating book'
      })
    }
  },

  // Read all books on local database
  async read (req, res) {
    const Op = db.Sequelize.Op;
    try {
      const options = {}
      // define all the search parameter (if available)
      if (req.query.name) options.name = req.query.name
      if (req.query.country) options.country = req.query.country
      if (req.query.publisher) options.publisher = req.query.publisher
      if (req.query.release_date) options.release_date = { [Op.startsWith]: `${req.query.release_date}` }
      const result = await Book.findAll({
        where: options
      })
      const books = result.map(item => ({
        id: item.id,
        name: item.name,
        isbn: item.isbn,
        authors: item.authors,
        number_of_pages: item.number_of_pages,
        publisher: item.publisher,
        country: item.country,
        release_date: item.release_date
      }))
      return res.status(200).send({
        status_code: 200,
        status: 'success',
        data: books
      })
    } catch (error) {
      // error occured
      return res.status(500).send({
        status_code: 500,
        status: 'Error retrieving all books' 
      })
    }
  },

  // show the details of a book using a book id
  async show (req, res) {
    try {
      const result = await Book.findByPk(Number(req.params.id))
      if (!result) {
        return res.status(404).send({
          status_code: 404,
          status: `No book with the id: ${req.params.id}`
        })
      }
      var book = {
        id: result.id,
        name: result.name,
        isbn: result.isbn,
        authors: result.authors,
        number_of_pages: result.number_of_pages,
        publisher: result.publisher,
        country: result.country,
        release_date: result.release_date
      }
      return res.status(200).send({
        status_code: 200,
        status: 'success',
        data: book
      })
    } catch (error) {
      // error occured
      return res.status(500).send({
        status_code: 500,
        status: 'Error retrieving book'
      })
    }
  },

  async destroy (req, res) {
    try {
      const result = await Book.findByPk(Number(req.params.id))
      if (!result) {
        return res.status(404).send({ 
          status_code: 404,
          status: `No book with the id: ${req.params.id}`
        })
      }
      var bookTitle = result.name
      await Book.destroy({
        where: {
          id: req.params.id
        }
      })
      return res.status(200).send({
        status_code: 204,
        status: 'success',
        message: `The book ${bookTitle} was deleted successfully`,
        data: []
      })
    } catch (error) {
      // error occured
      return res.status(500).send({
        status_code: 500,
        status: 'Error retrieving book'
      })
    }
  },

  async update (req, res) {
    try {
      const result = await Book.findByPk(Number(req.params.id))
      if (!result) {
        return res.status(404).send({ 
          status_code: 404,
          status: `No book with the id: ${req.params.id}`
        })
      }
      var bookTitle = result.name
      var book = {
        id: result.id,
        name: req.body.name ? req.body.name : result.name,
        isbn: req.body.isbn ? req.body.isbn : result.isbn,
        authors: req.body.authors ? req.body.authors : result.authors,
        number_of_pages: req.body.number_of_pages ? req.body.number_of_pages : result.number_of_pages,
        publisher: req.body.publisher ? req.body.publisher : result.publisher,
        country: req.body.country ? req.body.country : result.country,
        release_date: req.body.release_date ? req.body.release_date : result.release_date
      }
      await Book.update(book, {
        where: {
          id: req.params.id
        }
      })
      return res.status(200).send({
        status_code: 200,
        status: 'success',
        message: `The book ${bookTitle} was updated successfully`,
        data: book
      })
    } catch (error) {
      // error occured
      return res.status(500).send({
        status_code: 500,
        status: 'Error retrieving book'
      })
    }
  }

}