import axios from 'axios';

// actionType
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';

//action creators
export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
};

export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

export const getPostsByCategory = (posts) => {
  return {
    type: GET_POSTS_BY_CATEGORY,
    payload: posts,
  };
};

export const getPostByID = (post) => {
  return {
    type: GET_POST_BY_ID,
    payload: post,
  };
};

export const getCommentsByPost = (comments) => {
  return {
    type: GET_COMMENTS_BY_POST,
    payload: comments,
  };
};

export const getCommentByID = (comment) => {
  return {
    type: GET_COMMENT_BY_ID,
    payload: comment,
  };
};

// async action creators

//comments actions

//fetch all the comments of a post
export const fetchCommentsByPost = (post_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/${post_id}/comments`,
        {
          headers: { Authorization: 'whatever-you-want' },
        }
      );
      dispatch(getCommentsByPost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//for getting a single comment
export const fetchCommentByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${id}`, {
        headers: { Authorization: 'whatever-you-want' },
      });
      dispatch(getCommentByID(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//for posting a comment
export const postComments = (comment) => {
  return () => {
    axios.post('http://localhost:3001/comments', comment, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

export const voteComments = (id, vote) => {
  return () => {
    axios.post(`http://localhost:3001/comments/${id}`, vote, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

export const modifyComments = (id, details) => {
  return () => {
    axios.put(`http://localhost:3001/comments/${id}`, details, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

//for deleting a comment using its ID
export const deleteComment = (id) => {
  return () => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

//Categories actions
//getting the categories supported by the app
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/categories', {
        headers: { Authorization: 'whatever-you-want' },
      });
      dispatch(getCategories(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//Post actions

//creating a post
export const publishPost = (post) => {
  return () => {
    axios.post('http://localhost:3001/posts', post, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

//getting all the posts
export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/posts', {
        headers: { Authorization: 'whatever-you-want' },
      });
      dispatch(getPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//getting a posts by thier categories
export const fetchPostsByCategory = (category) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/${category}/posts`,
        {
          headers: { Authorization: 'whatever-you-want' },
        }
      );
      dispatch(getPostsByCategory(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//getting a post with a unique ID
export const fetchPostByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${id}`, {
        headers: { Authorization: 'whatever-you-want' },
      });
      dispatch(getPostByID(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editPost = (post_id, details) => {
  return () => {
    axios.put(`http://localhost:3001/posts/${post_id}`, details, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

export const votePost = (post_id, vote) => {
  return () => {
    axios.post(`http://localhost:3001/posts/${post_id}`, vote, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};

//for deleting a post
export const deletePost = (post_id) => {
  return () => {
    axios.delete(`http://localhost:3001/posts/${post_id}`, {
      headers: { Authorization: 'whatever-you-want' },
    });
  };
};
