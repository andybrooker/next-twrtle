import { useQuery } from "react-query";
const sixtyMinsInMs = 60 * 60 * 1000;

export const getLink = async (targetUrl) => {
  const response = await fetch(`/api/twitter/links`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: targetUrl }),
  });

  if (!response.ok) {
    throw new Error("Network Response failed.");
  }

  return response.json();
};

export default function useLink(targetUrl) {
  return useQuery(["link", targetUrl], () => getLink(targetUrl), {
    staleTime: sixtyMinsInMs,
  });
}
