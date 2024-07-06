import React, { useState } from "react";
import { Card, CardBody, CardText, Button, Input } from "reactstrap";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaPaperPlane,
  FaEllipsisH,
} from "react-icons/fa";
import {
  addComment,
  likePost,
  dislikePost,
  deletePost,
} from "../../helper/api";

const PostItem = ({ post, setPosts }) => {
  console.log("post: ", post);
  const [comment, setComment] = useState("");
  const userId = "123"; // Replace with actual user ID from authentication

  const handleLike = async () => {
    try {
      await likePost(post?._id, userId);
      setPosts((prevPosts) =>
        prevPosts?.map((p) =>
          p._id === post?._id ? { ...p, likes: p.likes + 1, isLiked: true } : p
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikePost(post?._id, userId);
      setPosts((prevPosts) =>
        prevPosts?.map((p) =>
          p._id === post?._id
            ? { ...p, dislikes: p.dislikes + 1, isDisliked: true }
            : p
        )
      );
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await addComment(post?._id, { user_id: userId, text: comment });
        setPosts((prevPosts) =>
          prevPosts?.map((p) =>
            p._id === post?._id
              ? {
                  ...p,
                  comments: [...p.comments, { user_id: userId, text: comment }],
                }
              : p
          )
        );
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post?._id);
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post?._id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Card className="post-item mb-4">
      <div className="post-header d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center">
          <img
            src={post?.userAvatar}
            alt={post?.username}
            className="rounded-circle mr-2"
            width="32"
            height="32"
          />
          <span className="font-weight-bold">{post?.username}</span>
        </div>
        <Button color="link" className="p-0" onClick={handleDelete}>
          <FaEllipsisH />
        </Button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post.post_content }}
        className="p-4"
      ></div>
      <CardBody>
        <div className="post-actions d-flex align-items-center mb-3">
          <Button color="link" className="mr-3 p-0" onClick={handleLike}>
            {post?.isLiked ? (
              <FaHeart color="red" size={24} />
            ) : (
              <FaRegHeart size={24} />
            )}
          </Button>
          <Button color="link" className="mr-3 p-0" onClick={handleDislike}>
            <FaComment size={24} />
          </Button>
          <Button color="link" className="p-0">
            <FaPaperPlane size={24} />
          </Button>
        </div>
        <p className="font-weight-bold mb-1">{post?.likes} likes</p>
        <CardText>
          <span className="font-weight-bold mr-2">{post?.username}</span>
          {post?.caption}
        </CardText>
        <div className="post-tags mb-2">
          {/* {post?.tags?.map((tag, index) => (
            <span key={index} className="mr-2 text-primary">
              #{tag}
            </span>
          ))} */}
          {post?.tags?.split(",")?.map((tag, index) => (
            <span key={index} className="mr-2 text-primary">
              #{tag}
            </span>
          ))}
        </div>
        <Button color="link" className="p-0 text-muted">
          View all {post?.comments && post?.comments?.length} comments
        </Button>
        {/* {post?.comments &&
          post?.comments?.slice(0, 2)?.map((comment, index) => (
            <CardText key={index} className="mb-1">
              <span className="font-weight-bold mr-2">{comment.username}</span>
              {comment.text}
            </CardText>
          ))} */}
        <small className="text-muted">{post?.timeAgo}</small>
        <form onSubmit={handleCommentSubmit} className="mt-3">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      </CardBody>
    </Card>
  );
};

export default PostItem;
