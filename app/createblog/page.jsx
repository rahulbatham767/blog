import React from "react";
import dynamic from "next/dynamic";

const Blog = dynamic(() => import("@/app/components/Blog"), { ssr: false });
const Page = () => {
  return (
    <div className="flex  mx-auto gap-7  justify-center my-12">
      <div>
        <p className="text-3xl font-semibold mb-4 ">Create Blog</p>
        <div>
          <Blog />
        </div>
      </div>
    </div>
  );
};

export default Page;
