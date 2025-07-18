import React, { useState } from "react";
import { uploadImage } from "../api/upload";

const Form = ({ onSubmit }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage(image);
      console.log(imageUrl)
    }

    const newPost = {
      Id: Date.now().toString(),
      author,
      content,
      image: imageUrl,
    };

    onSubmit(newPost);
    setAuthor("");
    setContent("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        className="w-full mb-2 border px-3 py-2 rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full mb-2 border px-3 py-2 rounded"
        required
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
    </form>
  );
};

export default Form;
