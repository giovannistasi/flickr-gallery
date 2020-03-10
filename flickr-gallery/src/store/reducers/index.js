import { combineReducers } from 'redux';
import pictures from './pictures';
import picture from './picture';

const reducers = combineReducers({
  pictures, picture
})

export default reducers;