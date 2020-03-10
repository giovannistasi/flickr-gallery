const initialState = {
  favorited: []
}

const picture = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES_SUCCESS':
      return {
        ...state,
        favorited: [
          ...state.favorited,
          ...action.id
        ]
      }
    case 'REMOVE_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        favorited: state.favorited.filter(el => el.id !== action.id)
      }
    default:
      return state;
  }
}

export default picture;