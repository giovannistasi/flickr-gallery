const request = require('supertest');
const server = require('../../index');


describe('basic route tests', () => {
  it('should get pictures route /pictures', async () => {
    const headerObj = {
      'content-type': 'application/json; charset=utf-8',
    }
    const response = await request(server).get('/pictures');
    expect(response.status).toEqual(200);
    expect(response.header).toMatchObject(headerObj)
  });

  it('should get categories route /categories', async () => {
    const headerObj = {
      'content-type': 'application/json; charset=utf-8',
    }
    const response = await request(server).get('/categories');
    expect(response.status).toEqual(200);
    expect(response.header).toMatchObject(headerObj)
  });
});