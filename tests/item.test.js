
const request = require('supertest')
const app = require('../app')
const Item = require('../models/Item')

describe('node', () => {
    it('get all nodes as a tree', async () => {
        const res = await request(app)
            .get('/node')
            .send({
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('graph page', () => {
    it('open the graph page', async () => {
        const res = await request(app)
            .get('/')
            .send({
            })
        expect(res.statusCode).toEqual(200)
    })
})


