import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_POSTS_BY_CATEGORY,
  GET_COMMENT_BY_ID,
  GET_COMMENTS_BY_POST,
} from '../actions/action';

const initialState = {
  categories: null,
  posts: null,
  postByID: null,
  postByCategory: null,
  commentsByPost: null,
  commentByID: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        postByID: action.payload,
      };
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        postByCategory: action.payload,
      };
    case GET_COMMENTS_BY_POST:
      return {
        ...state,
        commentsByPost: action.payload,
      };
    case GET_COMMENT_BY_ID:
      return {
        ...state,
        commentByID: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
