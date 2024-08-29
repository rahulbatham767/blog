"use client";
import React, { useState, useEffect } from "react";

import Card from "./components/Card";
import useBlogStore from "./store/useBlogStore";
export default function Home() {
  const { posts, fetchPosts, isLoading, isError } = useBlogStore();

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, [fetchPosts]);

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <span className="loading loading-ring loading-lg "></span>
      </div>
    );
  return (
    <main className="min-h-screen min-w-screen">
      <div className="flex w-full justify-center mt-7">
        <p className="text-3xl">Blog Application</p>
      </div>
      <div className="flex justify-center   mt-16">
        <div className="flex   items-center gap-5 flex-wrap">
          {posts.length > 0 ? (
            posts.map((post, id) => <Card key={id} post={post} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </main>
  );
}
