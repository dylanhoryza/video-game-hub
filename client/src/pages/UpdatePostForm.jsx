import React, { useState } from 'react';

const UpdatePostForm = ({ post, updatePost }) => {
  const [content, setContent] = useState(post.content);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePost({ postId: post._id, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <textarea className='comment-text-area' value={content} onChange={handleContentChange} />
      </label>
      <br />
      <button className='update-btn' type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
