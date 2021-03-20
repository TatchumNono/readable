import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchCategories, deletePost } from '../actions/action';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.categories.posts);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(posts);

  return (
    <div className="container">
      <div>
        <button onClick={() => history.push('/create')}>New Post</button>
      </div>
      <div>
        {categories == null ? (
          <p>No categories</p>
        ) : (
          <div className="categories">
            {Object.keys(categories).map((key) =>
              categories[key].map((item) => (
                <button
                  key={uuidv4()}
                  onClick={() => history.push(`/${item.name}`)}>
                  {item.name}
                </button>
              ))
            )}
          </div>
        )}

        {posts == null ? (
          <p>No posts yet</p>
        ) : (
          posts.map((post) => (
            <>
              <div key={post.id} className="card">
                <div className="header">
                  <h3>{post.author}</h3>
                  <p>{new Date(post.timestamp).toUTCString()}</p>
                  <p>{post.category}</p>
                </div>

                <h2>
                  {/*<Link to={`/post/${post.id}`} />*/}
                  <a href={`/${post.category}/${post.id}`}>{post.title}</a>
                </h2>

                <p>{post.body}</p>
                <div className="bottom">
                  <button>{post.commentCount} comments</button>
                  <p>{post.voteScore} votes</p>
                  <button onClick={() => dispatch(deletePost(post.id))}>
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))
        )}
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
