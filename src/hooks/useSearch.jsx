import { useQuery } from 'react-query'
const fifteenMinsinMS = 15 * 60 * 1000;

export const getSearch = async (searchTerm) => {

    const response = await fetch(`/api/search/${searchTerm}`)

    if (!response.ok) {
        throw new Error('Network Response failed.')
    }

    return response.json()

}

export default function useSearch(searchTerm) {
    return useQuery(["search", searchTerm], () => getSearch(searchTerm), {
    })
}
