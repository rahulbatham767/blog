import React from "react";
import Blog from "../components/blog";
import Card from "../components/Card";
import CardView from "../components/CardView";

const page = () => {
  return (
    <div className="flex  mx-auto gap-7  justify-center my-12">
      <div>
        <p className="text-3xl font-semibold mb-4 ">Create Blog</p>
        <Blog />
      </div>
    </div>
  );
};

export default page;
