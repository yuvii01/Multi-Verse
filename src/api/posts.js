const STORAGE_KEY = 'school_posts';

export async function fetchPosts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function createPost(post) {
  const posts = await fetchPosts();
  const newPost = {
    id: Date.now(),
    ...post,
    comments: [],
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function addComment(postId, commentText) {
  const posts = await fetchPosts();
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        likes: 0,
      };
      return { ...post, comments: [...post.comments, newComment] };
    }
    return post;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return updatedPosts;
}

export async function likeComment(postId, commentId) {
  const posts = await fetchPosts();
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      const updatedComments = post.comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });
      return { ...post, comments: updatedComments };
    }
    return post;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  return updatedPosts;
}
