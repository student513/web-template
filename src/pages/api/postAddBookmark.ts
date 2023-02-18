export const postAddBookmark = (documentId: string) => {
  return {
    method: "post",
    url: `/collection/document/${documentId}`,
  };
};
