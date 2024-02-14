import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../utils/mutations';
import { GET_COMMENTS } from '../utils/queries';
import Button from '@mui/material/Button';

// comment form for comments 
const CommentForm = ({ postId, onCommentAdded }) => {
    const [text, setText] = useState('');

    const [addComment, { loading, error }] = useMutation(CREATE_COMMENT, {
        onCompleted: () => {
            setText('');
            onCommentAdded();
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
        },
        refetchQueries: [{ query: GET_COMMENTS, variables: { postId } }],
    });
    // handle form changes 
    const handleInputChange = (e) => {
        setText(e.target.value);
    };
    // comment submit handler 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('postId:', postId);
        console.log('text:', text);
        try {
            await addComment({ variables: { content: text, post: postId } });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comment:
                <textarea className='comment-text-area'
                    value={text}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <Button type='submit' variant="contained" color="primary" disabled={loading}>Add Comment</Button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default CommentForm;
