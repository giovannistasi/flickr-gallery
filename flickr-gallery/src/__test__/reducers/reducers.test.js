import pictures from '../../store/reducers/pictures';

describe("Pictures reducer", () => {
  const state = { pictureList: [{ id: 2 }] };
  it('should return an array of unique pictures on success', () => {
    expect(pictures(state, {
      type: 'FETCH_PICTURES_SUCCESS',
      data: [{ id: 1 }, { id: 2 }, { id: 3 }]
    })).toEqual({ loading: false, pictureList: [{ id: 2 }, { id: 1 }, { id: 3 }] });
  })
});
