import './App.css';
//import { useSelector, useDispatch } from 'react-redux';
//import { useEffect } from 'react';
/* import {
  fetchCategories,
  fetchPosts,
  fetchPostByID,
  fetchPostsByCategory,
} from './actions/action'; */
//import { v4 as uuidv4 } from 'uuid';
import Routes from './Router';

function App() {
  // const categories = useSelector((state) => state.categories.categories);
  //const posts = useSelector((state) => state.categories.posts);
  //const postbyID = useSelector((state) => state.categories.postByID);
  //const postByCategory = useSelector(
  //  (state) => state.categories.postByCategory
  //);
  //const dispatch = useDispatch();

  /* const [post, setPost] = useState({
    id: uuidv4(),
    title: '',
    body: '',
    author: '',
    category: '',
    timestamp: Date.now(),
  }); */

  //const id = '6ni6ok3ym7mf1p33lnez';
  //const categor = 'react';

  /* const changes = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost((prev) => ({ ...prev, [name]: value }));
  }; */

  /* useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPosts());
    dispatch(fetchPostByID(id));
    dispatch(fetchPostsByCategory(categor));
  }, [dispatch]); */

  //console.log(categories == null ? null : categories);
  //console.log(posts == null ? null : posts);
  //console.log(postbyID == null ? null : postbyID);
  //console.log(postByCategory == null ? null : postByCategory);

  //console.log(Date.now());
  //console.log(uuidv4());

  /* <p>Here are some posts categories</p>
      {categories == null ? (
        <p>no CATEGORIES YET</p>
      ) : (
        Object.keys(categories).map((key) =>
          categories[key].map((item) => <p key={uuidv4()}>{item.name}</p>)
        )
      )}
      <h1>The articles are listed below</h1> */

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
