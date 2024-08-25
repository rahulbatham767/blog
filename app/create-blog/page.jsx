import React from "react";
import Blog from "@/app/components/Blog";

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
