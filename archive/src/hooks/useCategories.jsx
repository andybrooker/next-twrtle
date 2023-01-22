import { useQuery } from "react-query";
const fifteenMinsinMS = 15 * 60 * 1000;

export const getCategories = async () => {
  const response = await fetch(`/api/categories`);

  if (!response.ok) {
    throw new Error("Network Response failed.");
  }

  return response.json();
};

export default function useCategories() {
  return useQuery("categories", () => getCategories(), {
    useErrorBoundary: true,
  });
}
