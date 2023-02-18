export const deleteRemoveBookmark = (documentId: string) => {
  return {
    method: "delete",
    url: `/collection/document/${documentId}`,
  };
};
