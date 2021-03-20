import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchPostByID, fetchCommentsByPost } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import '../App.css';

const Post = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const id = param.id;
  const post = useSelector((state) => state.categories.postByID);
  const comments = useSelector((state) => state.categories.commentsByPost);
  console.log(param.id);
  console.log(post == null ? null : post);
  console.log(comments == null ? null : comments);

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
