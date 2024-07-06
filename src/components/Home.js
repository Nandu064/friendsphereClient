import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Header from "./Header";
import PostList from "./post/PostList";
import { getPosts } from "../helper/api";
import { AppContext } from "../context/AppContext";

const HomePage = () => {
  const { isPostDeleted } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [isPostDeleted]);

  return (
    <div className="instagram-clone">
      <Container className="mt-4">
        <Row className="">
          <Col xs={8}>
            <h3>Recent Posts</h3>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button
              color="primary"
              className="create-post-btn"
              onClick={() => {
                window.location.href = "/create-post";
              }}
            >
              Create Post
            </Button>
          </Col>
        </Row>
        <PostList posts={posts} setPosts={setPosts} />
      </Container>
    </div>
  );
};

export default HomePage;
