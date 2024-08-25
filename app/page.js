"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "./redux/slice/userSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const response = dispatch(getBlog());
  }, [dispatch]);

  const { isLoading, data } = useSelector((state) => state.blog.blogSlice);

  console.log(data);

  return (
    <main className="min-h-screen min-w-screen">
      <div className="flex w-full justify-center mt-7">
        <p className="text-3xl">Blog Application</p>
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <span className="loading loading-ring loading-lg "></span>
        </div>
      )}
      <div className="flex justify-center   mt-16">
        <div className="flex   items-center gap-5 flex-wrap">
          {data.length > 0 ? (
            data.map((post, id) => <Card key={id} post={post} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </main>
  );
}
