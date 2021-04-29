import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchCategories } from "../actions/action";
import "../App.css";
import "./modal.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
//import Modal from './Modal';

const Home = () => {
  //const modal = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.categories.posts);
  const categories = useSelector((state) => state.categories.categories);
  //const [confirm, setConfirm] = useState(false);
  //const [ID, setID] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(posts);

  return (
    <>
      <div className='container'>
        <div>
          <button onClick={() => history.push("/create")}>New Post</button>
        </div>
        <div>
          {categories == null ? (
            <p>No categories</p>
          ) : (
            <div className='categories'>
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
              <div key={post.id} className='card'>
                <div className='header'>
                  <h3>{post.author}</h3>
                  <p>{new Date(post.timestamp).toUTCString()}</p>
                  <p>{post.category}</p>
                </div>

                <h2>
                  {/*<Link to={`/post/${post.id}`} />*/}
                  <a href={`/${post.category}/${post.id}`}>{post.title}</a>
                </h2>

                <p>{post.body}</p>
                <div className='bottom'>
                  <p>{post.commentCount} comments</p>
                  <p>{post.voteScore} votes</p>
                  {/*  <button onClick={() => modal.current.open()}>Delete</button> */}
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Home;
