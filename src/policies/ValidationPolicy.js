// require the necessary packages
const Joi = require('@hapi/joi')
// Load the full build.
var { isEmpty } = require('lodash');

module.exports = {
  // create validation
  create (req, res, next) {
    if (!isEmpty(req.body)) {
      const schema = Joi.object({
        name: Joi.string().required(),
        isbn: Joi.string().required(),
        country: Joi.string().required(),
        authors: Joi.array().items(Joi.string()).required(),
        number_of_pages: Joi.number().required(),
        publisher: Joi.string().required(),
        release_date: Joi.date().required()
      })
      const { error } = schema.validate(req.body)
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'isbn':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'country':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'authors':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'number_of_pages':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'publisher':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'release_date':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          default:
            res.status(400).send({
              error: 'Validation failed - each element of the array must be a string'
            })
        }
      } else {
        next()
      }
    } else {
      res.status(400).send({
        error: 'Payload is empty'
      })
    }
  },
  
  // update validation
  update (req, res, next) {
    if (!isEmpty(req.body)) {
      const schema = Joi.object({
        name: Joi.string(),
        isbn: Joi.string(),
        country: Joi.string(),
        authors: Joi.array().items(Joi.string()),
        number_of_pages: Joi.number(),
        publisher: Joi.string(),
        release_date: Joi.date()
      })
      const { error } = schema.validate(req.body)
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'isbn':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'country':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'authors':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'number_of_pages':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'publisher':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          case 'release_date':
            res.status(400).send({
              error: error.details[0].message
            })
            break
          default:
            res.status(400).send({
              error: 'Validation failed - each element of the array must be a string'
            })
        }
      } else {
        next()
      }
    } else {
      res.status(400).send({
        error: 'Payload is empty'
      })
    }
  },
}