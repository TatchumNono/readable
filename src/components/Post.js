import { v4 as uuidv4 } from "uuid";
import LineIcon from "react-lineicons";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchPostByID,
  fetchCommentsByPost,
  postComments,
  deleteComment,
  deletePost,
  votePost,
} from "../actions/action";
import "../App.css";
import "./modal.css";
import DeleteConfirm from "./Modals/DeleteConfirm";
import EditPost from "./Modals/EditPost";
import Error from "./Modals/Error";
import EditComment from "./Modals/EditComment";

const Post = () => {
  const commentDeleteConfirmModal = useRef(null);
  const postDeleteConfirmModal = useRef(null);
  const postError = useRef(null);
  const postEditModal = useRef(null);
  const commentEditModal = useRef(null);
  const param = useParams();
  const route = useHistory();
  let location = useLocation();
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

  const [upVote, setUpvote] = useState("violet");
  const [downVote, setDownvote] = useState("violet");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  //console.log(param.id);
  //console.log(post == null ? null : post);
  //console.log(comments == null ? null : comments);
  console.log(location);

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
      route.replace(location.pathname);
    }, 1000);
  };

  const commentDeleteHandle = (post_id) => {
    dispatch(deleteComment(post_id));
    setTimeout(() => {
      commentDeleteConfirmModal.current.close();
      route.push(location.pathname);
    }, 1000);
  };

  const postDeleteHandle = (post_id) => {
    dispatch(deletePost(post_id));
    setTimeout(() => {
      postDeleteConfirmModal.current.close();
      route.replace(location.pathname);
    }, 1000);
  };

  useEffect(() => {
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
              <button onClick={() => postDeleteConfirmModal.current.open()}>
                Delete
              </button>
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
                    <button onClick={() => commentEditModal.current.open()}>
                      Edit
                    </button>
                    <button
                      onClick={() => commentDeleteConfirmModal.current.open()}>
                      Delete
                    </button>
                  </div>

                  <DeleteConfirm
                    message='Comment'
                    state={commentDeleteConfirmModal}
                    method={commentDeleteHandle}
                    id={comment.id}
                  />

                  <EditComment
                    state={commentEditModal}
                    id={comment.id}
                    error={postError}
                  />
                </div>
              ))
            )}
          </div>

          <DeleteConfirm
            message='Post'
            state={postDeleteConfirmModal}
            method={postDeleteHandle}
            id={post.id}
          />

          <Error state={postError} />

          <EditPost state={postEditModal} id={id} error={postError} />
        </>
      )}
      <div></div>
    </div>
  );
};

export default Post;
