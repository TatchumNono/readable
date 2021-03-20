import { combineReducers } from 'redux';
import categoryReducer from './category';

export const rootReducer = combineReducers({
  categories: categoryReducer,
});
