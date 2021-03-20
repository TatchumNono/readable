import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsByCategory } from '../actions/action';
import '../App.css';

const PostCategory = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const category = param.category;
  const posts = useSelector((state) => state.categories.postByCategory);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPostsByCategory(category));
  }, [dispatch, category]);

  return (
    <div className="container">
      <div></div>
      <div>
        {posts == null ? (
          <p>loading</p>
        ) : (
          <div className="card">
            {posts.map((post) => (
              <>
                <div className="header">
                  <h3>{post.author}</h3>
                  <p>{new Date(post.timestamp).toUTCString()}</p>
                </div>
                <h2>
                  <a href={`/post/${post.id}`}>{post.title}</a>
                </h2>
                <p>{post.body}</p>
                <div className="bottom">
                  <button>{post.commentCount} comments</button>
                  <p>{post.voteScore} votes</p>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default PostCategory;
