import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import Navbar from './Navbar';


const BlogPage = () => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const { loading, error, data } = useQuery(GET_ALL_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddPost = () => {
    };

    return (
        <div>
             <Navbar />
            <header>
                <h2>Video Game Forum</h2>
                <Link to='/profile'>To Home</Link>
            </header>

            <section>
                <h3>Posts</h3>
                {data.getAllPosts.map(post => (
                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Author: {post.author.username}</p>
                        <p>Created At: {Date()}</p>
                    </div>
                ))}
            </section>

            <section>
                <h3>Create a Post</h3>
                <form onSubmit={handleAddPost}>
                    <label>Title:
                        <input
                            type='text'
                            name='title'
                            value={newPost.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>Content:
                        <textarea
                            name='content'
                            value={newPost.content}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='submit'>Add Post</button>
                </form>
            </section>
        </div>
    );
}

export default BlogPage;
