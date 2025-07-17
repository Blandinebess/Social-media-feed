import React from "react";
import Post from "./Post.jsx";

const PostList = ({ posts, onDelete }) => {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <Post key={index} post={post} onDelete={() => onDelete(index)} />
        ))
      )}
    </div>
  );
};

export default PostList;
