import { useQuery } from "react-query";
const fifteenMinsinMS = 15 * 60 * 1000;

export const getAuthorsFromCategory = async (category) => {
  const response = await fetch(`/api/authors/${category}`);

  if (!response.ok) {
    throw new Error("Network Response failed.");
  }

  return response.json();
};

export default function useAuthorsFromCategory(category) {
  return useQuery(
    ["category", category],
    () => getAuthorsFromCategory(category),
    {}
  );
}
