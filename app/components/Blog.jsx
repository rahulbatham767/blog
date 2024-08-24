"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Post_Blog } from "../redux/slice/userSlice";
import axios from "axios";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file)); // Show the image preview
      setUploading(true);

      const uploadPreset = "blog_application"; // Your Cloudinary upload preset
      const cloudName = "dor9ze1rj"; // Your Cloudinary cloud name

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        setImageUrl(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    } else {
      console.error("The dropped file is not an image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!title || !author || !content || !imageUrl) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const blogPost = {
      title,
      author,
      content,
      image: imageUrl, // Use the Cloudinary image URL
    };

    dispatch(Post_Blog(blogPost));
    await onPublish(blogPost);
  };

  const onPublish = async (blogPost) => {
    try {
      const response = await axios.post("http://localhost:3000/post", blogPost);
      console.log("Blog post submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };

  // Clean up the image preview URL when the component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Author Name"
            className="input input-bordered w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div {...getRootProps()} className="mb-4 border-dashed border-2 p-4">
          <input {...getInputProps()} />
          {uploading ? (
            <p>Uploading image...</p>
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Image Preview" className="max-w-xs" />
          </div>
        )}

        <button onClick={handleSubmit} className="btn btn-primary">
          Publish
        </button>
      </div>
    </div>
  );
};

export default Blog;
