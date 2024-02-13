import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import Navbar from './Navbar';
import Button from '@mui/material/Button';

const ForumPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const posts = data?.getAllPosts;

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px'
            }}>
                <Button
                    component={Link}
                    to='/create-post'
                    variant="contained"
                >
                    Create a Post
                </Button>
                <h2 className='video-game-forum-top' style={{
                    textAlign: 'center',
                    margin: '0 auto'
                }}>
                    Video Game Forum</h2>
                <Button
                    component={Link}
                    to='/user-posts'
                    variant="contained"
                >
                    View My Threads
                </Button>
            </div>

            <div className='forum-card-container'>
                <div className="forum-card">
                    <h1 className='threads-header'>Threads</h1>
                    {posts.map(post => (
                        <div className="post" key={post._id}>
                            <h2 className='post-title'>{post.title}</h2>
                            <p className='post-content'>{post.content}</p>
                            <p className="author">Author: {post.author.username}</p>
                            <p className="created-at">Created At: {new Date(parseInt(post.createdAt)).toLocaleDateString()}</p>
                            {/* needs proper pathing, made a successful backend query for solo post and added it to front end */}
                            <Button component={Link} to={`/solo-thread/${post._id}`}>View Thread</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForumPage;
