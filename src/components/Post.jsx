import React from "react";

const Post = ({ post, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <p className="text-gray-800 mb-2">{post.content}</p>
      <p className="text-xs text-gray-400">
        Posted on: {new Date(post.createdAt).toLocaleString()}
      </p>
      <button
        onClick={onDelete}
        className="text-red-500 text-sm mt-2 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default Post;
