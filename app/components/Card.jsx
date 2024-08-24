"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ post }) => {
  // Handle the case where post is undefined or null
  if (!post) {
    return <div>No post data available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 m-5">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow align-baseline dark:bg-gray-800 dark:border-gray-700">
        <Link href="/">
          <div
            style={{ width: "300px", height: "300px", position: "relative" }}
          >
            <Image
              className="rounded-t-lg"
              src={post?.image || ""} // Dynamic image URL with a fallback
              alt={post?.title || "No title"} // Dynamic alt text with a fallback
              layout="fill" // Ensures the image covers the entire div
              objectFit="cover" // Ensures the image maintains its aspect ratio
            />
          </div>
        </Link>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post?.title || "No Title"} {/* Fallback to "No Title" */}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {/* {post?.body || "No content available"}{" "} */}
            <div
              dangerouslySetInnerHTML={{
                __html: post ? post.body : "<p>Description</p>",
              }}
            />
          </p>
          <p>
            Author:{" "}
            <span className="font-semibold">{post?.author || "Unknown"}</span>{" "}
            {/* Fallback to "Unknown" */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
