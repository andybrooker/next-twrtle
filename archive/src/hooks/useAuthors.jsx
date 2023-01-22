import { useQuery } from 'react-query'


const getAuthors = async () => {

    const response = await fetch('/api/authors')

    if (!response.ok) {
        throw new Error('Network Response failed.')
    }

    return response.json()

}

export default function useAuthors() {
    return useQuery("authors", getAuthors)
}
