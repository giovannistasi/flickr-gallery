import { API } from '../../store/middlewares/apiService'

export const fetchPictures = () => ({
  type: 'FETCH_PICTURES',
  [API]: {
    path: '/pictures'
  }
});

export const fetchTags = () => ({
  type: 'FETCH_TAGS',
  [API]: {
    path: '/tags'
  }
});

export const emptyCurrentPics = () => ({
  type: 'EMPTY_CURRENT_PICS'
});

export const fetchPicturesFromTag = (tag, pageNum) => ({
  type: 'FETCH_PICTURES_FROM_TAG',
  [API]: {
    path: '/pictures-from-tags/:' + tag + '/:' + pageNum,
  },
  tag: tag
});

export const fetchPicturesFromSearch = (search, pageNum) => ({
  type: 'FETCH_PICTURES_FROM_SEARCH',
  [API]: {
    path: '/pictures-from-search/:' + search + '/:' + pageNum,
  },
  searchValue: search
});

export const selectPicture = (picture) => ({
  type: 'SELECT_PICTURE',
  data: picture
});

export const increasePageNum = () => ({
  type: 'INCREASE_PAGE_NUM'
});