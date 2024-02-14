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
          

            <div className='forum-card-container'>
                <div className="forum-card">
                    <h1 className='threads-header'>Game Threads</h1>
                    <div className='threads-btns' style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                margin: '-10px'
            }}>
                <Button
                    component={Link}
                    to='/create-post'
                    variant="contained"
                >
                    Create Post
                </Button>
                <h2 className='video-game-forum-top' style={{
                    textAlign: 'center',
                    margin: '0 auto'
                }}>
                   </h2>
                <Button
                    component={Link}
                    to='/user-posts'
                    variant="contained"
                >
                    View My Threads
                </Button>
            </div>
                    {posts.map(post => (
                        <div className="post" key={post._id}>
                            <h2 className='post-title'>{post.title}</h2>
                            <p className="author">Posted by: {post.author.username}</p>
                            <p className="created-at"> {new Date(parseInt(post.createdAt)).toLocaleDateString()}</p>
                            <p className='post-content'>{post.content}</p>
                            <div className='custom-button'>
                            <Button className='custom-button' variant='contained' component={Link} to={`/solo-thread/${post._id}`}>View Thread</Button>
                            </div>
                            {/* needs proper pathing, made a successful backend query for solo post and added it to front end */}
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForumPage;
