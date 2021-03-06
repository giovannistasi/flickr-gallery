const initialState = {
  pictureList: [],
  selectedPicture: null,
  tags: [],
  selectedTag: null,
  searchValue: null,
  pageNum: 1,
  picturesFromTag: [],
  loading: false
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
    case 'FETCH_PICTURES':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_PICTURES_SUCCESS':
      return {
        ...state,
        pictureList: [
          ...state.pictureList,
          ...discardRepeatedPics(state.pictureList, action.data)
        ],
        loading: false
      };
    case 'FETCH_TAGS_SUCCESS':
      return {
        ...state,
        tags: [
          ...state.tags,
          ...action.data,
        ],
      };
    case 'FETCH_PICTURES_FROM_TAG':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_PICTURES_FROM_TAG_SUCCESS':
      return {
        ...state,
        pictureList: [
          ...state.pictureList,
          ...discardRepeatedPics(state.pictureList, action.data)
        ],
        selectedTag: action.tag || state.selectedTag,
        loading: false
      }
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.data
      }
    case 'EMPTY_CURRENT_PICS':
      return {
        ...state,
        pictureList: [],
        pageNum: 1,
        selectedTag: null,
        searchValue: null
      }
    case 'INCREASE_PAGE_NUM':
      return {
        ...state,
        pageNum: state.pageNum + 1
      }
    case 'FETCH_PICTURES_FROM_SEARCH':
      return {
        ...state,
        loading: true,
        searchValue: action.searchValue || state.searchValue,
      }
    case 'FETCH_PICTURES_FROM_SEARCH_SUCCESS':
      return {
        ...state,
        pictureList: [
          ...state.pictureList,
          ...discardRepeatedPics(state.pictureList, action.data)
        ],
        loading: false
      }
    default:
      return state;
  }
};

export default pictures;