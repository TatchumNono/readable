import { useState } from "react";
import Modal from "../Modal";
import { editPost } from "../../actions/action";
import { useDispatch } from "react-redux";

const EditPost = ({ state, id, error }) => {
  const dispatch = useDispatch();
  const [edit, setPost] = useState({
    title: "",
    body: "",
  });

  const change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const submitEditedPost = (e) => {
    e.preventDefault();
    if (edit.body === "" || edit.title === "") {
      console.log("Please provide the body or author of the comment");
      error.current.open();
    } else {
      dispatch(editPost(id, edit));
    }
  };

  return (
    <Modal ref={state}>
      <div className='card'>
        <h1>Edit</h1>
        <form onSubmit={submitEditedPost}>
          <input
            type='text'
            name='title'
            value={edit.title}
            onChange={change}
          />
          <br />
          <textarea
            type='text'
            name='body'
            value={edit.body}
            onChange={change}
          />
          <br />
          <button type='submit'>Post</button>
          <button onClick={() => state.current.close()}>Cancel</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditPost;
