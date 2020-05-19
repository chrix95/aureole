const express = require('express')
const router = express.Router();
const BookController = require('../controllers/BookController')
const ValidationPolicy = require('../policies/ValidationPolicy')

router.post('/', ValidationPolicy.create, BookController.create)
router.get('/', BookController.read)
router.get('/:id', BookController.show)
router.delete('/:id', BookController.destroy)
router.patch('/:id', ValidationPolicy.update, BookController.update)

module.exports = router