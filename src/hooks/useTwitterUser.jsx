import { useQuery } from "react-query";
import useAuthors from "./useAuthors";

const fifteenMinsinMS = 15 * 60 * 1000;

const getTwitterUser = async (username) => {

    const response = await fetch(`/api/twitter/user/${username}`)

    if (!response.ok) {
        throw new Error('Failed to fetch username.')
    }

    return response.json()

}

export default function useTwitterUser(username) {

    const {data: authors} = useAuthors();

    const enabled = true
    
    return useQuery(["author", username], () => getTwitterUser(username),
    {
        enabled: enabled,
        useErrorBoundary: true,
        staleTime: fifteenMinsinMS
    });
}