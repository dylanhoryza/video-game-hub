import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_COMMENT } from '../utils/mutations'; 

const UpdateCommentForm = ({ comment, onSave }) => { 
    const [content, setContent] = useState(comment.content);
    const [updateComment] = useMutation(UPDATE_COMMENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateComment({
                variables: {
                    id: comment.id,
                    content
                }
            });
            onSave(comment.id, content); // Call the onSave function to close the form
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comment:
                <textarea value={content} onChange={handleContentChange} />
            </label>
            <button type="submit">Update Comment</button>
        </form>
    );
};

export default UpdateCommentForm;
