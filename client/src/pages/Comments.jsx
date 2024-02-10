import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';

const Comments = ({ postId }) => {
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { postId },
    });

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Assuming the query is named 'comments' in your typeDefs
    // const comments = data?.comments;

    return (
        <div>
            <h4>Comments</h4>
            {data.comments.map(comment => (
                <div key={comment.id}>
                    <p>Content: {comment.content}</p>
                    <p>By: {comment.author.username}</p>
                    <p>Created At: {comment.updatedAt ? `Updated At: ${new Date(parseInt(comment.updatedAt)).toLocaleDateString()}` : `Created At: ${new Date(parseInt(comment.createdAt)).toLocaleDateString()}`}</p>
                </div>
            ))}
        </div>
    );
};

export default Comments;
