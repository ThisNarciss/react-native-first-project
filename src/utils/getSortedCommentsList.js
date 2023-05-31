export const getSortedCommentList = (comments) => {
  return comments.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};
