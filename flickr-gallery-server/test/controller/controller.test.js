const controller = require('../../controller');
const Context = require('koa');

const ctx = {};
describe('Fetch all photos', () => {
  jest.setTimeout(30000)
  it('should load 30 photos', async () => {
    await controller.getPictures(ctx, () => { }).then(() => {
      expect(ctx.body).toBeDefined()
      expect(ctx.body.length).toBe(30)
    })
  });
  // TODO:
  // it('should recursively make requests to the API if no response is returned', () => {
  //   //if !ctx.body
  //   // expect(controller.recursiveGet()).
  //   // at least 1 time 
  //   // toHaveBeenCalledTimes(1);
  // });
  it('should contain photos with the required owner information', () => {
    const profileInfo = {
      id: expect.any(String),
      join_date: expect.any(String)
    }
    expect(ctx.body[0].ownerInfo.profile).toMatchObject(profileInfo)
  });
  it('should contain photos with the required metadata', () => {
    const infoObj = {
      owner: expect.any(String),
      title: expect.any(String)
    }
    expect(ctx.body[0]).toMatchObject(infoObj)
  });
});

describe('Fetch photos by tag', () => {
  jest.setTimeout(30000)
  it('should load 30 photos', async () => {
    await controller.getPictures(ctx, () => { }).then(() => {
      expect(ctx.body).toBeDefined()
      expect(ctx.body.length).toBe(30)
    })
  });
  it('should contain photos with the required owner information', () => {
    const profileInfo = {
      id: expect.any(String),
      join_date: expect.any(String)
    }
    expect(ctx.body[0].ownerInfo.profile).toMatchObject(profileInfo)
  });
  it('should contain photos with the required metadata', () => {
    const infoObj = {
      owner: expect.any(String),
      title: expect.any(String)
    }
    expect(ctx.body[0]).toMatchObject(infoObj)
  });
})
