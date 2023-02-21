import { useDeleteRemoveBookmark } from "@/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";

export const useRemoveBookmarkMutation = (
  searchResultId: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const deleteRemoveBookmark = useDeleteRemoveBookmark();

  return useMutation({
    mutationFn: () => deleteRemoveBookmark(searchResultId),
    onError,
    onSuccess,
  });
};
