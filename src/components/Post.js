import { v4 as uuidv4 } from "uuid";
import LineIcon from "react-lineicons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostByID,
  fetchCommentsByPost,
  postComments,
  deleteComment,
  votePost,
} from "../actions/action";
import "../App.css";

const Post = () => {
  const param = useParams();
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
    } else {
      dispatch(postComments(comment));
      setTimeout(() => {
        dispatch(fetchPostByID(id));
      }, 2000);
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
    }, 2000);
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
              <button>Edit</button> <button>Delete</button>
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
                  <div className='header'>
                    <h3>{comment.author}</h3>
                    <p>{new Date(comment.timestamp).toUTCString()}</p>
                  </div>
                  <p>{comment.body}</p>
                  <p>{comment.voteScore} vote</p>
                  <button onClick={() => dispatch(deleteComment(comment.id))}>
                    Delete
                  </button>
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
