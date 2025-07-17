import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import { getPosts, createPost, deletePost, updatePost } from "./utils/aws";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.reverse());
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async (post) => {
    try {
      await createPost(post);
      setPosts([post, ...posts]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (updatedPost) => {
    try {
      await updatePost(updatedPost);
      setPosts((prev) =>
        prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  const filteredPosts = posts.filter((post) =>
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🌐 My Social Feed
        </h1>

        <Form onSubmit={handleAddPost} />

        <input
          type="text"
          placeholder="🔍 Search by author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded my-4"
        />

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <p className="font-semibold text-gray-800">{post.author}</p>
              <p className="text-gray-700 mb-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded w-full max-h-64 object-cover"
                />
              )}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-red-500"
                >
                  ❤️ {post.likes || 0}
                </button>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      handleEdit({
                        ...post,
                        content: prompt("Edit your post", post.content),
                      })
                    }
                    className="text-blue-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
