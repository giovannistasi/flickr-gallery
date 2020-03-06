import pictures from './pictures';

describe("Pictures reducer", () => {
  console.log(pictures);
  const state = {pictureList: [{id: 2}]};
  it('should return an array of unique pictures on success', () => {
    expect(pictures(state, {
      type: 'FETCH_PICTURES_SUCCESS',
      data: [{id: 1}, {id: 2}, {id:3}]
    })).toEqual({pictureList: [{id: 2}, {id: 1}, {id: 3}]});
  })
});
