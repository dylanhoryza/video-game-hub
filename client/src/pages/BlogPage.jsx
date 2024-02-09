import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import { CREATE_POST } from '../utils/mutations'; 
import Navbar from './Navbar';
import Comments from './Comments'; 
import CommentForm from './CommentForm';

const BlogPage = () => {
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [createPost] = useMutation(CREATE_POST, {
        refetchQueries: [{ query: GET_ALL_POSTS }],
    });

    // grab auth useEffect possibly for user id to pass that value as the id 
    // save blogs to user
    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await createPost({
                variables: {
                    title: newPost.title,
                    content: newPost.content,
                },
            });
            // Reset form field after successful submission
            setNewPost({ title: '', content: '' });
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return ( 
        <div>
            <Navbar />
            <header className='forum-header'>
                <h2>Video Game Forum</h2>
                <Link to='/profile'>To Home</Link>
            </header>

            <section className="forum-card">
                <h3>Posts</h3>
                
                {data.getAllPosts.map(post => (
                    <div className="post" key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p className="author">Author: {post.author.username}</p>
                        <p className="created-at">{post.updatedAt ? `Updated At: ${new Date(parseInt(post.createdAt)).toLocaleString()}` : `Created At: ${new Date(parseInt(post.createdAt)).toLocaleString()}`}</p>
                        <div className="comments">
                            <CommentForm postId={post._id} />
                            <Comments postId={post._id} /> 
                        </div>
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
};

export default BlogPage;
