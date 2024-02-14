import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Navbar from './Navbar';

const CreatePostPage = ({ refetchPosts }) => {
    const navigate = useNavigate();
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
            // Redirect back to BlogPage
            navigate('/blog');
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
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
                <Button
                    component={Link}
                    to='/blog'
                    variant="contained"
                    color="primary"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Back to Forums
                </Button>
            </div>
            <div className='forum-card-container'>
            <div className='post'>
            <h2>Create a New Post</h2>
            <form onSubmit={handleAddPost}>
                <label htmlFor='title'>Title:</label>
                <input className='comment-text-area'
                    type='text'
                    id='title'
                    name='title'
                    value={newPost.title}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <label htmlFor='content'>Content:</label>
                <textarea className='comment-text-area'
                    id='content'
                    name='content'
                    value={newPost.content}
                    onChange={handleInputChange}
                    required
                />
                <br />

                <Button className='btn btn-primary' type='submit' variant="contained" color="primary">Add Post</Button>
            </form>

            </div>
            </div>
            
           
        </div>
    );
};

export default CreatePostPage;
