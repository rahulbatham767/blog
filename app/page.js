"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";

export default function Home() {
  const [data, setData] = useState([]); // Use an array as the initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post");
        setData(response.data.post); // Set the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <main className="min-h-screen min-w-screen">
      <div className="flex w-full justify-center mt-7">
        <p className="text-3xl">Blog Application</p>
      </div>

      <div className="    mt-16">
        <div className="flex justify-center items-center gap-5">
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
