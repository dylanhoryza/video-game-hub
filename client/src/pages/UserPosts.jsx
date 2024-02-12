import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { GET_USER_POSTS } from '../utils/queries';
import { DELETE_POST } from '../utils/mutations';
import  Button  from '@mui/material/Button';
import Navbar from './Navbar';

const UserPostPage = () => {
    const [deletePost] = useMutation(DELETE_POST, {
        // Update the cache after a successful deletion
        update(cache, { data: { deletePost } }) {
            // Fetch the current list of posts from the cache
            const { getMyPost } = cache.readQuery({ query: GET_USER_POSTS });

            // Remove the deleted post from the list
            const updatedPosts = getMyPost.filter(post => post._id !== deletePost._id);

            // Write the updated posts list back to the cache
            cache.writeQuery({
                query: GET_USER_POSTS,
                data: { getMyPost: updatedPosts },
            });
        },
    });

    // CTRL ALT DLt
    const handleDelete = async (postId) => {
        try {
            // Call the deletePost mutation
            await deletePost({
                variables: { postId },
            });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const { loading, error, data } = useQuery(GET_USER_POSTS);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error...</p>;
    }

    return (

        <div className='forum-card-container'>
            <Navbar />
            <div className='forum-card'>
                {data.getMyPost.map(post => (
                    <div className='post' key={post._id}>
                        <h2 className='post-title'>{post.title}</h2>
                        <p className='post-content'>{post.content}</p>
                        <p className='author'>Author: {post.author.username}</p>
                        <p className='created-at'>Created At: {new Date(parseInt(post.createdAt)).toLocaleDateString()}</p>
                        <div className='button-group'>
                            <Button className='post-update-button'>Update</Button>
                            <Button className='post-delete-button' onClick={() => handleDelete(post._id)}>Delete</Button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPostPage;
