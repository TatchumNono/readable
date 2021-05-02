import Modal from "../Modal";
import { useState } from "react";
import { modifyComments } from "../../actions/action";
import { useDispatch } from "react-redux";

const EditComment = ({ state, error, id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ timestamp: Date.now(), body: "" });

  const submitEditedComment = (e) => {
    e.preventDefault();
    if (comment.body === "" || comment.author === "") {
      console.log("Please provide the body or author of the comment");
      error.current.open();
    } else {
      dispatch(modifyComments(id, comment));
    }
  };

  return (
    <Modal ref={state}>
      <div class='card'>
        <form onSubmit={submitEditedComment}>
          <textarea
            type='text'
            name='body'
            value={comment.body}
            onChange={(e) =>
              setComment((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <br />
          <button type='submit'>Post</button>
          <button onClick={() => state.current.close()}>Cancel</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditComment;
