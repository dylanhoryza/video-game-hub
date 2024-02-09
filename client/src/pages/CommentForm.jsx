import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations'; 
import { GET_COMMENTS_BY_POST_ID } from '../utils/queries'; 

// comment form for comments 
const CommentForm = ({ postId, authorId }) => {
    const [text, setText] = useState('');

    const [addComment, { loading, error }] = useMutation(ADD_COMMENT, {
        onCompleted: () => {
            setText('');
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
        },
        refetchQueries: [{ query: GET_COMMENTS_BY_POST_ID, variables: { postId } }],
    });
    // handle form changes 
    const handleInputChange = (e) => {
        setText(e.target.value);
    };
    // comment submit handler 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment({ variables: { postId, text, authorId } });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comment:
                <textarea
                    value={text}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type='submit' disabled={loading}>Add Comment</button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default CommentForm;
