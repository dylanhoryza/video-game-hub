import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {

    // test page layout 
    const [forumPosts, setForumPosts] = useState([
        { id: 1, title: 'First Post', content: 'This is some test text to see whats being rendered.' },
        { id: 2, title: 'Second Post', content: 'We will probably want to do cards instead of li just a quick backbone' },
    ]);

    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddPost = () => {
        setForumPosts([...forumPosts, { id: forumPosts.length + 1, ...newPost }]);
        setNewPost({ title: '', content: '' });
    };

    return (
        <div>
            <h2>Video Game Forum</h2>

            {/* link to navigate back to profile page */}
            <Link to='/profile'>To Home</Link>

            { /* list of forum posts */}
            <ul>
                {forumPosts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>

            { /* form for createing new posts */}
            <div>
                <h3>Create a Post</h3>
                <form>
                    <label>Title:
                        <input
                            type='text'
                            name='title'
                            value={newPost.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>Content:
                        <textarea
                            name='content'
                            value={newPost.content}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='button' onClick={handleAddPost}>
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BlogPage;