import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_POSTS } from '../utils/queries';
import { DELETE_POST, UPDATE_POST } from '../utils/mutations';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import UpdatePostForm from './UpdatePostForm';

const UserPostPage = () => {
  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      const { getMyPost } = cache.readQuery({ query: GET_USER_POSTS });
      const updatedPosts = getMyPost.filter((post) => post._id !== deletePost._id);
      cache.writeQuery({
        query: GET_USER_POSTS,
        data: { getMyPost: updatedPosts },
      });
    },
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    update(cache, { data: { updatePost } }) {
      const { getMyPost } = cache.readQuery({ query: GET_USER_POSTS });
      const updatedPosts = getMyPost.map((post) =>
        post._id === updatePost._id ? updatePost : post
      );
      cache.writeQuery({
        query: GET_USER_POSTS,
        data: { getMyPost: updatedPosts },
      });
    },
  });

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); 
  const [selectedPost, setSelectedPost] = useState(null); 

  const handleDelete = async (postId) => {
    try {
      await deletePost({
        variables: { postId },
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
    setIsUpdateFormOpen(true);
  };

  const { loading, error, data } = useQuery(GET_USER_POSTS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  return (
    <div className="forum-card-container">
      <Navbar />
      <div className="forum-card">
        {data.getMyPost.map((post) => (
          <div className="post" key={post._id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <p className="author">Author: {post.author.username}</p>
            <p className="created-at">
              Created At: {new Date(parseInt(post.createdAt)).toLocaleDateString()}
            </p>
            <div className="button-group">
              <Button className="post-update-button" onClick={() => handleUpdate(post)}>
                Update
              </Button>
              <Button className="post-delete-button" onClick={() => handleDelete(post._id)}>
                Delete
              </Button>
              {isUpdateFormOpen && selectedPost && selectedPost._id === post._id && (
                <UpdatePostForm
                  post={selectedPost}
                  updatePost={(updatedPost) => {
                    updatePost({ variables: updatedPost });
                    setIsUpdateFormOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostPage;
