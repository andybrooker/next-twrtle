import { useQuery } from 'react-query'


const getAuthors = async (author) => {

    const response = await fetch('/api/authors')

    if (!response.ok) {
        throw new Error('Network Response failed.')
    }

    const authors = await response.json()

    const checkAuthor = (obj) => obj.username == author;
    return authors.some(checkAuthor)

}

export default function useAuthorCheck(author, userFollows) {
    return useQuery(`authorcheck-${author}`, () => getAuthors(author), {initialData: userFollows})
}
