"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { trim } from "../lib/slice";

const Card = ({ post }) => {
  // Handle the case where post is undefined or null
  if (!post) {
    return <div>No post data available</div>;
  }

  return (
    <div className="flex flex-wrap  gap-4  mx-auto">
      <div className="max-w-sm bg-white border w-[22rem]  h-full border-gray-200 rounded-lg shadow align-baseline dark:bg-gray-800 dark:border-gray-700">
        <Link href="/">
          <div className="relative w-full h-72">
            {" "}
            {/* Updated height using Tailwind CSS */}
            <Image
              className="rounded-t-lg"
              src={post?.image || ""}
              alt={post?.title || "No title"}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post?.title || "No Title"}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div
              dangerouslySetInnerHTML={{
                __html: post ? trim(post.body) : "<p>Description</p>",
              }}
            />
          </p>
          <p>
            Author:{" "}
            <span className="font-semibold">{post?.author || "Unknown"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
