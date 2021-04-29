import { v4 as uuidv4 } from "uuid";
import LineIcon from "react-lineicons";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchPostByID,
  fetchCommentsByPost,
  postComments,
  deleteComment,
  deletePost,
  votePost,
  editPost,
} from "../actions/action";
import "../App.css";
import "./modal.css";
import Modal from "./Modal";

const Post = () => {
  const modal = useRef(null);
  const postModal = useRef(null);
  const postError = useRef(null);
  const postEditModal = useRef(null);
  const param = useParams();
  const route = useHistory();
  const dispatch = useDispatch();
  const id = param.id;
  const post = useSelector((state) => state.categories.postByID);
  const comments = useSelector((state) => state.categories.commentsByPost);
  const [comment, setComment] = useState({
    id: uuidv4(),
    timestamp: Date.now(),
    body: "",
    author: "",
    parentId: id,
  });
  const [edit, setPost] = useState({
    title: "",
    body: "",
  });
  const [upVote, setUpvote] = useState("violet");
  const [downVote, setDownvote] = useState("violet");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
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
    if (comment.body === "" || comment.author === "") {
      console.log("Please provide the body or author of the comment");
      postError.current.open();
    } else {
      dispatch(postComments(comment));
      //setTimeout(() => {
      //  dispatch(fetchPostByID(id));
      //}, 2000);
    }
  };

  const submitEditedPost = (e) => {
    e.preventDefault();
    if (edit.body === "" || edit.title === "") {
      console.log("Please provide the body or author of the comment");
      postError.current.open();
    } else {
      dispatch(editPost(id, edit));
    }
  };

  const vote = (vote_id) => {
    const UpVote = { option: "upVote" };
    const DownVote = { option: "downVote" };
    if (vote_id === 1) {
      if (downVote === "blue") {
        setDownvote("violet");
      }
      if (flag === false) {
        upVote === "violet" ? setUpvote("blue") : setUpvote("violet");
        dispatch(votePost(id, UpVote));
        setFlag(true);
        setFlag1(false);
        dispatch(fetchPostByID(id));
      }
    } else {
      if (upVote === "blue") {
        setUpvote("violet");
      }
      if (flag1 === false) {
        dispatch(votePost(id, DownVote));
        downVote === "violet" ? setDownvote("blue") : setDownvote("violet");
        setFlag1(true);
        setFlag(false);
        dispatch(fetchPostByID(id));
      }
    }
  };

  const postHandle = () => {
    setTimeout(() => {
      setComment({ body: "", author: "" });
      dispatch(fetchCommentsByPost(id));
    }, 1000);
  };

  const change1 = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPost((prev) => ({ prev, [name]: value }));
  };

  const commentDeleteHandle = (post_id) => {
    dispatch(deleteComment(post_id));
  };

  const postDeleteHandle = (post_id) => {
    dispatch(deletePost(post_id));
    setTimeout(() => {
      route.push("/");
    }, 1000);
  };

  const openConfirm = () => {
    modal.current.open();
    console.log("ok");
  };

  const closeConfirm = () => {
    modal.current.close();
    postModal.current.close();
    postError.current.close();
    postEditModal.current.close();
  };

  useEffect(() => {
    /* setInterval(() => {
      dispatch(fetchPostByID(id));
    }, 2000); */
    dispatch(fetchPostByID(id));
    dispatch(fetchCommentsByPost(id));
  }, [dispatch, id]);

  return (
    <div className='container'>
      <div></div>
      {post == null ? (
        <p>Loading</p>
      ) : (
        <>
          <div key={post.id} className='card'>
            <div className='header'>
              <h2>{post.author}</h2>
              <p>{new Date(post.timestamp).toUTCString()}</p>
              <p>{post.category}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className='controls'>
              <LineIcon
                name='thumbs-up'
                size='lg'
                effect='burst'
                tag='button'
                style={{ color: upVote }}
                onClick={() => vote(1)}
              />
              <LineIcon
                name='thumbs-down'
                size='lg'
                effect='burst'
                tag='button'
                style={{ color: downVote }}
                onClick={() => vote(2)}
              />
            </div>
            <div className='bottom'>
              <p>{post.voteScore} votes</p>
            </div>
            <div className='controls'>
              <button onClick={() => postEditModal.current.open()}>Edit</button>{" "}
              <button onClick={() => postModal.current.open()}>Delete</button>
            </div>
            <hr />
            <form onSubmit={submitComment}>
              <textarea
                type='text'
                name='body'
                value={comment.body}
                onChange={change}
              />
              <br />
              <input
                type='text'
                name='author'
                value={comment.author}
                onChange={change}
              />
              <br />
              <button onClick={postHandle} type='submit'>
                Post
              </button>
            </form>

            <h2>Comments</h2>
            <p>{post.commentCount} comments</p>
            {comments == null ? (
              <p>loading</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id}>
                  <div>
                    <div className='header'>
                      <h3>{comment.author}</h3>
                      <p>{new Date(comment.timestamp).toUTCString()}</p>
                    </div>
                    <p>{comment.body}</p>
                    <p>{comment.voteScore} vote</p>
                    <button onClick={openConfirm}>Delete</button>
                  </div>

                  <Modal ref={modal}>
                    <div className='card'>
                      <h1>Confirm!</h1>
                      <p>Do you want to delete this comment</p>
                      <button onClick={closeConfirm}>Cancel</button>
                      <button onClick={() => commentDeleteHandle(comment.id)}>
                        Delete
                      </button>
                    </div>
                  </Modal>
                </div>
              ))
            )}
          </div>
          <Modal ref={postModal}>
            <div className='card'>
              <h1>Confirm!</h1>
              <p>Do you want to delete this Post</p>
              <button onClick={closeConfirm}>Cancel</button>
              <button onClick={() => postDeleteHandle(post.id)}>Delete</button>
            </div>
          </Modal>

          <Modal ref={postError}>
            <div className='card'>
              <h1>Error</h1>
              <p>Please provide the body or author of the comment</p>
              <button onClick={closeConfirm}>Cancel</button>
            </div>
          </Modal>

          <Modal ref={postEditModal}>
            <div className='card'>
              <h1>Edit</h1>
              <form onSubmit={submitEditedPost}>
                <input
                  type='text'
                  name='title'
                  value={edit.title}
                  onChange={change1}
                />
                <br />
                <textarea
                  type='text'
                  name='body'
                  value={edit.body}
                  onChange={change1}
                />
                <br />
                <button onClick={postHandle} type='submit'>
                  Post
                </button>
              </form>
              <button onClick={() => postEditModal.current.close()}>
                Cancel
              </button>
            </div>
          </Modal>
        </>
      )}
      <div></div>
    </div>
  );
};

export default Post;
