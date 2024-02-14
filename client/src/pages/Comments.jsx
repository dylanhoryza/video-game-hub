import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS, QUERY_ME } from '../utils/queries';
import { DELETE_COMMENT, UPDATE_COMMENT } from '../utils/mutations';  
import Button from '@mui/material/Button';
import UpdateCommentForm from './UpdateCommentForm';  

const Comments = ({ postId }) => {
    const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
    const currentUserId = meData?.me?._id || null;

    const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
        variables: { postId },
    });

    const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
    const [updateCommentMutation] = useMutation(UPDATE_COMMENT);

    const [editingCommentId, setEditingCommentId] = useState(null);  

    if (meLoading) {
        return <p>Loading user data...</p>;
    }
    if (meError) {
        return <p>Error: {meError.message}</p>;
    }

    if (loading) {
        return <p>Loading comments...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const comments = data?.comments;

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteCommentMutation({
                variables: { deleteCommentId: commentId },
            });
            refetch();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleUpdateComment = (commentId) => {
        console.log("Update comment clicked for comment ID:", commentId);
        setEditingCommentId(commentId);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
    };

    const handleSaveEdit = async (commentId, content) => {
        try {
            const result = await updateCommentMutation({
                variables: { id: commentId, content },
            });
            console.log("Update result:", result);
            setEditingCommentId(null);
            refetch();
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div>
            <h3 className='comments-title'>Comments</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                    {/* ... */}
                    {editingCommentId === comment.id ? (
                        <UpdateCommentForm
                            comment={comment}
                            onSave={handleSaveEdit}
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                        <>
                            <p className='post-content'>{comment.content}</p>
                            <p className="author">Comment By: {comment.author.username}</p>
                            <p className="created-at">{comment.updatedAt ? `Updated At: ${new Date(parseInt(comment.updatedAt)).toLocaleDateString()}` : `${new Date(parseInt(comment.createdAt)).toLocaleDateString()}`}</p>
                            {currentUserId === comment.author._id && (
                                <>
                                    <Button onClick={() => handleUpdateComment(comment.id)} variant="contained" color="primary">Update</Button>
                                    <Button onClick={() => handleDeleteComment(comment.id)} variant="contained" color="secondary">Delete</Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Comments;