"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBlogStore from "../store/useBlogStore";

function Toastify() {
  const { message, isLoading, isError } = useBlogStore();
  useEffect(() => {
    if (message && message.message) {
      toast(message.message, { type: message.type });
    }
  }, [message]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Toastify;
