const initialState = {
  pictureList: [],
  selectedPicture: null,
  tags: [],
  picturesFromTag: [],
}

// Discard fetched pics that are already in the store
const discardRepeatedPics = (baseArr, newArr) => {
  const res = [];
  newArr.forEach(newPic => {
    if (baseArr.every(oldPic => newPic.id !== oldPic.id)) res.push(newPic)
  })
  return res
}

const pictures = (state = initialState, action) => {
  switch (action.type) {
    // case 'FETCH_PICTURES':
    //   return state
    case 'FETCH_PICTURES_SUCCESS':
      return {
        ...state,
        pictureList: [
          ...state.pictureList,
          ...discardRepeatedPics(state.pictureList, action.data)
        ]
      };
    case 'FETCH_TAGS_SUCCESS':
      return {
        ...state,
        tags: [
          ...state.tags,
          ...action.data
        ]
      };
    case 'FETCH_PICTURES_FROM_TAG_SUCCESS':
      return {
        ...state,
        pictureList: [
          ...action.data
        ]
      }
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.data
      }
    default:
      return state;
  }
};

export default pictures;