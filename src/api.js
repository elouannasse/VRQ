import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const fetchPosts = async (userId) => {
  const { data } = await api.get(`/posts?userId=${userId}`);
  return data;
};

export const createPost = async (newPost) => {
  const { data } = await api.post('/posts', newPost);
  return data;
};

export const updatePost = async ({ id, ...post }) => {
  const { data } = await api.put(`/posts/${id}`, post);
  return data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  return id;
};
