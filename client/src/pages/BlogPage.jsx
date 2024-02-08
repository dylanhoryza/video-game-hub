import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_COMMENTS_BY_POST_ID } from '../utils/queries';

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
}

const Comments = ({ postId }) => {
    const { loading, error, data } = useQuery(GET_COMMENTS_BY_POST_ID, {
        variables: { postId },
    });

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h4>Comments</h4>
            {data.comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>By: {comment.author.username}</p>
                    <p>{comment.updatedAt ? `Updated At: ${new Date(parseInt(comment.updatedAt)).toLocaleDateString()}` : `Created At: ${new Date(parseInt(comment.createdAt)).toLocaleDateString()}`}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogPage;
