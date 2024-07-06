import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, Input, Button } from "reactstrap";

const CommentModal = ({ isOpen, toggle, post }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement comment submission logic
    setComment("");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Comments</ModalHeader>
      <ModalBody>
        <div className="post-content mb-4">
          <h5>{post.username}</h5>
          <p>{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post" className="img-fluid mb-3" />
          )}
        </div>
        <Form onSubmit={handleSubmit}>
          <Input
            type="textarea"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            rows={3}
          />
          <Button color="primary" className="mt-2" type="submit">
            Submit Comment
          </Button>
        </Form>
        <div className="comments-list mt-4">
          <h6>Previous Comments</h6>
          {/* Add dummy comments here */}
          <p>
            <strong>User1:</strong> Great post!
          </p>
          <p>
            <strong>User2:</strong> Thanks for sharing!
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CommentModal;
