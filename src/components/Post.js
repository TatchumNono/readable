import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchPostByID,
  fetchCommentsByPost,
  postComments,
  deleteComment,
} from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';

const Post = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const id = param.id;
  const post = useSelector((state) => state.categories.postByID);
  const comments = useSelector((state) => state.categories.commentsByPost);
  const [comment, setComment] = useState({
    id: uuidv4(),
    timestamp: Date.now(),
    body: '',
    author: '',
    parentId: id,
  });
  console.log(param.id);
  console.log(post == null ? null : post);
  console.log(comments == null ? null : comments);

  const change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (comment.body === '') {
      console.log('Please provide the body of the comment');
    } else {
      dispatch(postComments(comment));
    }
  };

  useEffect(() => {
    dispatch(fetchPostByID(id));
    dispatch(fetchCommentsByPost(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <div></div>
      {post == null ? (
        <p>Loading</p>
      ) : (
        <>
          <div key={post.id} className="card">
            <div className="header">
              <h2>{post.author}</h2>
              <p>{new Date(post.timestamp).toUTCString()}</p>
              <p>{post.category}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="bottom">
              <button>{post.commentCount} comments</button>
              <p>{post.voteScore} votes</p>
            </div>
            <div className="controls">
              <button>Edit</button> <button>Delete</button>
            </div>
            <hr />
            <form onSubmit={submitComment}>
              <textarea
                type="text"
                name="body"
                value={comment.body}
                onChange={change}
              />
              <input
                type="text"
                name="author"
                value={comment.author}
                onChange={change}
              />
              <br />
              <button type="submit">Post</button>
            </form>

            <h2>Comments</h2>
            {comments == null ? (
              <p>loading</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id}>
                  <div className="header">
                    <h3>{comment.author}</h3>
                    <p>{new Date(comment.timestamp).toUTCString()}</p>
                  </div>
                  <p>{comment.body}</p>
                  <p>{comment.voteScore}</p>
                  <button onClick={() => dispatch(deleteComment(comment.id))}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
      <div></div>
    </div>
  );
};

export default Post;
