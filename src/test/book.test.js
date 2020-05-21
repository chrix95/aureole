require('./config')
const db = require('../models/index')
// truncate the db
// immport the models
const BookModel = require('../models/Book')
// use models by passing the connection and Sequelize
const Book = BookModel(db.sequelize, db.Sequelize)
Book.destroy({ truncate : true, cascade: false })
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const should = chai.should()
chai.use(chaiHttp)


describe('/POST Books', () => {
  it('it should create a new book', (done) => {
      const book = {
        "name": "test",
        "isbn": "test",
        "country": "test",
        "authors": ["Eddy R. Charles", "Sylvester G. O."],
        "number_of_pages": 234,
        "publisher": "Simi Enisu",
        "release_date": "2020-04-23"
      }
      chai.request(app)
      .post('/api/v1/books')
      .send(book)
      .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('status_code').eq(201)
          res.body.should.have.property('status').eq('success')
          res.body.should.have.property('data')
          done()
      })
  })
})

describe('/GET BOOKS', () => {
  it('it should read all books from IceAndFire', (done) => {
    chai.request(app)
    .get('/api/external-books')
    .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status_code').eq(200)
        res.body.should.have.property('status').eq('success')
        res.body.should.have.property('data')
        done();
    })
  })
  it('it should read all books on localserver', (done) => {
    chai.request(app)
    .get('/api/v1/books')
    .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status_code').eq(200)
        res.body.should.have.property('status').eq('success')
        res.body.should.have.property('data')
        done();
    })
  })
  it('it should read all books using some search parameter', (done) => {
    chai.request(app)
    .get('/api/v1/books?name=Fast & Furious 7')
    .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status_code').eq(200)
        res.body.should.have.property('status').eq('success')
        res.body.should.have.property('data')
        done();
    })
  })
  it('it should return a books', (done) => {
    chai.request(app)
    .get('/api/v1/books/1')
    .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status_code').eq(200)
        res.body.should.have.property('status').eq('success')
        res.body.should.have.property('data')
        done();
    })
  })
})

describe('/PATCH Books', () => {
  it('it should update a book record', (done) => {
      const book = {
        "name": "test",
        "country": "test2",
        "number_of_pages": 234,
        "release_date": "2019-04-23"
      }
      chai.request(app)
      .patch('/api/v1/books/1')
      .send(book)
      .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status_code').eq(200)
          res.body.should.have.property('status').eq('success')
          res.body.should.have.property('message')
          res.body.should.have.property('data')
          done()
      })
  })
})

describe('/DELETE BOOK', () => {
  it('it should delete a book localserver', (done) => {
    chai.request(app)
    .delete('/api/v1/books/1')
    .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status_code').eq(204)
        res.body.should.have.property('status').eq('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        done();
    })
  })
})