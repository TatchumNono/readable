import '../App.css';
import { useState, useEffect } from 'react';
import { publishPost, fetchCategories } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
  const [post, setPost] = useState({
    id: uuidv4(),
    timestamp: Date.now(),
    title: '',
    body: '',
    author: '',
    category: '',
  });

  const dispatch = useDispatch();

  const Submit = (e) => {
    e.preventDefault();
    dispatch(publishPost(post));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const Changes = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="container">
      <div></div>
      <div className="card">
        <form
          onSubmit={Submit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={Changes}
              aria-label="title"
            />
          </label>
          <label>
            Body:
            <textarea
              type="text"
              name="body"
              value={post.body}
              onChange={Changes}
              aria-label="body"
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={post.author}
              onChange={Changes}
              aria-label="author"
            />
          </label>

          <select name="category" value={post.category} onChange={Changes}>
            {categories == null ? (
              <option>no CATEGORIES YET</option>
            ) : (
              Object.keys(categories).map((key) =>
                categories[key].map((item) => (
                  <option key={uuidv4()} value={item.name}>
                    {item.name}
                  </option>
                ))
              )
            )}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Create;