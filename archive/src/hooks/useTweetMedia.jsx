import { useQuery } from "react-query";

export const getTweetMedia = async (id) => {
  const response = await fetch(`/api/twitter/media/${id}`);

  if (!response.ok) {
    throw new Error("Network Response failed.");
  }

  return response.json();
};

export default function useTweetMedia(id, enabled) {
  return useQuery(["tweet-media", id], () => getTweetMedia(id), {
    useErrorBoundary: true,
    enabled: enabled,
  });
}
