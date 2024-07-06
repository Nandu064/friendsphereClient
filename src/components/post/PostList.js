import React from "react";
import PostItem from "./PostItem";

const dummyPosts = [
  {
    id: 1,
    username: "johndoe",
    content: "This is a sample post #react #javascript",
    date: "2024-07-05",
    isFollowing: false,
    isOwnPost: true,
    likes: 10,
    dislikes: 2,
    comments: 5,
    image: "https://via.placeholder.com/300x200",
  },
  // Add more dummy posts here
];

const PostList = ({ posts }) => {
  console.log("posts: ", posts);
  return (
    <div className="post-list">
      {posts.length > 0 &&
        posts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
