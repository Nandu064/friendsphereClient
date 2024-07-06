// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPosts = () => api.get(`/posts/get-posts`);
export const getPostById = (postId) => api.get(`/posts/get-post/${postId}`);
export const addPost = (postData) => api.post("/posts/add-post", postData);
export const editPost = (postId, postData) =>
  api.put(`/posts/${postId}`, postData);
export const deletePost = (postId) =>
  api.delete(`/posts/delete-post/${postId}`);
export const addComment = (postId, commentData) =>
  api.post(`/posts/${postId}/comment`, commentData);
export const likePost = (postId, userId) =>
  api.post(`/posts/${postId}/like`, { user_id: userId });
export const dislikePost = (postId, userId) =>
  api.post(`/posts/${postId}/dislike`, { user_id: userId });

export const register = (formData) =>
  api.post(`/user/add-user`, { ...formData });
export const login = (formData) => api.post(`/user/login`, { ...formData });
