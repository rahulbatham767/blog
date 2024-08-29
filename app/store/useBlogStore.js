import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchPostsAPI,
  loginAPI,
  logout,
  PostBlogAPI,
  signupAPI,
} from "@/app/utils/api"; // Adjust the import path as needed
import jsCookie from "js-cookie";

const authToken = jsCookie.get("authToken") || "";
console.log(authToken);
const useBlogStore = create(
  persist(
    (set, get) => ({
      loggedIn: authToken ? true : false,
      LoggedUser: null,
      posts: [],
      message: null,
      isLoading: false,
      isError: null,
      // Actions
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const user = await loginAPI(credentials);

          set({
            loggedIn: true,
            LoggedUser: user,
            message: { type: "success", message: "Logged in successfully" },
            isLoading: false,
            isError: null,
          });
        } catch (error) {
          set({
            isError: error.response?.data?.message || error.message,
            isLoading: false,
            message: { type: "danger", message: "Login failed" },
          });
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          const user = await signupAPI(userData);

          set({
            loggedIn: true,
            LoggedUser: user,
            message: { type: "success", message: "Signed up successfully" },
            isLoading: false,

            isError: null,
          });
        } catch (error) {
          set({
            isError: error.response?.data?.message || error.message,
            isLoading: false,
            message: { type: "danger", message: "Signup failed" },
          });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logout();
          jsCookie.remove("authToken");

          set({
            loggedIn: false,
            LoggedUser: null,
            message: {
              type: "danger",
              message: "You are successfully logged out",
            },
            isLoading: false,
            isError: null,
            tokens: {
              refresh: "",
              auth: "",
            },
          });
        } catch (error) {
          set({
            isError: error.response?.data?.message || error.message,
            isLoading: false,
            message: { type: "danger", message: "Logout failed" },
          });
        }
      },

      fetchPosts: async () => {
        set({ isLoading: true });
        try {
          const posts = await fetchPostsAPI();
          set({ posts, isLoading: false, isError: null });
        } catch (error) {
          set({
            isError: error.response?.data?.message || error.message,
            isLoading: false,
          });
        }
      },
      postPosts: async (blogPost) => {
        set({ isLoading: true });
        try {
          const posts = await PostBlogAPI(blogPost);
          set({
            isLoading: false,
            isError: null,
            message: {
              type: "success",
              message: "Blog post successfully",
            },
          });
        } catch (error) {
          set({
            isError: error.response?.data?.message || error.message,
            isLoading: false,
            message: {
              type: "danger",
              message: "Error Occured while posting Blog",
            },
          });
        }
      },
      clearMessage: () => set({ message: null }),
    }),
    {
      name: "blog-storage", // Name for the localStorage key
      storage: {
        getItem: (name) => {
          if (typeof window !== "undefined") {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          }
          return null;
        },
        setItem: (name, value) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);

if (typeof window !== "undefined") {
  window.store = useBlogStore; // Debugging aid
}

export default useBlogStore;
