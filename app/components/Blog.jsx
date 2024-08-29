"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";

import Image from "next/image";
import useBlogStore from "../store/useBlogStore";
import { useRouter } from "next/navigation";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { isError, postPosts } = useBlogStore();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
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
      image: imageUrl,
    };

    await postPosts(blogPost);
    router.push("/");
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col space-y-4 relative">
      <div>
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
            <p>Drag and drop an image here, or click to select one</p>
          )}
        </div>

        {imagePreview && (
          <div className="mb-4">
            <Image
              src={imagePreview}
              alt="Image Preview"
              width="300"
              height="300"
              className="max-w-xs"
            />
          </div>
        )}

        <button onClick={handleSubmit} className="btn btn-primary">
          Publish
        </button>

        {isError && (
          <p className="text-red-500 mt-2">
            An error occurred. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
