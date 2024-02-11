import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../utils/mutations';
import { GET_COMMENTS } from '../utils/queries';

// comment form for comments 
const CommentForm = ({ postId }) => {
    const [text, setText] = useState('');

    const [addComment, { loading, error }] = useMutation(CREATE_COMMENT, {
        onCompleted: () => {
            setText('');
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
