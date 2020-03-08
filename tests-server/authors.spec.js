/* globals beforeAll, afterAll, describe, test, expect */
const app = require('./../src/app.js')
const config = require('../src/config.json')
const authors = require('../src/Authors.json')

// Start application before running the test case
describe('API get authors test', function () {
  let instance
  beforeAll(async () => {
    instance = await app({ port: 3000 }).ready()
  })

  // Stop application after running the test case
  afterAll(async () => {
    instance.stop()
  })

  describe('GET all authors', () => {
    test('should return status code 200 and return Authors object', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: config.apiPath + '/authors'
      })

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual(authors)
    })
  })

  describe('GET non existing author', () => {
    test('should return status code 404', async function () {
      const nonExistingAuthorId = '-1'
      const result = await instance.inject({
        method: 'GET',
        url: config.apiPath + '/authors/' + nonExistingAuthorId
      })

      expect(result.statusCode).toBe(404)
    })
  })

  describe('GET author with id 1', () => {
    test('should return status code 200 and only one object with id 1', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: config.apiPath + '/authors/1'
      })

      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload).length).toEqual(1)
      expect(JSON.parse(result.payload)[0].id).toEqual(1)
    })
  })
})
