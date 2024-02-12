import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';

const CreatePostForm = ({ refetchPosts }) => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: () => {
            // Reset form field after successful submission
            setNewPost({ title: '', content: '' });
            // Refetch posts to update the list
            refetchPosts();
        },
    });

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await createPost({
                variables: {
                    title: newPost.title,
                    content: newPost.content,
                },
            });
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <form onSubmit={handleAddPost}>
            <label htmlFor='title'>Title:</label>
            <input
                type='text'
                id='title'
                name='title'
                value={newPost.title}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor='content'>Content:</label>
            <textarea
                id='content'
                name='content'
                value={newPost.content}
                onChange={handleInputChange}
                required
            />
            <br />

            <button className='btn btn-primary' type='submit'>Add Post</button>
        </form>
    );
};

export default CreatePostForm;
