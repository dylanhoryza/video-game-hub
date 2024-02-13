import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../utils/queries';
import Button from '@mui/material/Button';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UpdateCommentForm from './UpdateCommentForm';

const SinglePostPage = () => {
    const { postId } = useParams();
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { postId },
    });

    const [showCommentForm, setShowCommentForm] = useState(false); // State to control showing/hiding the comment form

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const post = data?.getPost;

    const handleCommentClick = () => {
        setShowCommentForm(prevState => !prevState); 
    };

    const handleCommentAdded = () => {
        setShowCommentForm(false); 
    };

    return (
        <div className='forum-card-container'>
            <div className='post'>
                <h1 className='post-title'>{post.title}</h1>
                <p className='post-content'>{post.content}</p>
                <p className='author'>Author: {post.author.username}</p>
                <p className='created-at'>Created At: {new Date(parseInt(post.createdAt)).toLocaleDateString()}</p>
                <Button onClick={handleCommentClick} variant="contained" color="primary">Comment</Button>
                {showCommentForm && <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />} {/* Render the comment form only if showCommentForm is true */}
                <Comments postId={postId} />
            </div>
        </div>
    );
};

export default SinglePostPage;
