import { usePostAddBookmark } from "@/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";

export const useAddBookmarkMutation = (
  searchResultId: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const postAddBookmark = usePostAddBookmark();

  return useMutation({
    mutationFn: () => postAddBookmark(searchResultId),
    onError,
    onSuccess,
  });
};
