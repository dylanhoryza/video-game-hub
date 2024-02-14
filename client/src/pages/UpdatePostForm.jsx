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
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <br />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
