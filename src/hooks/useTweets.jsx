import { useQuery } from 'react-query'
const fifteenMinsinMS = 15 * 60 * 1000;

const getUserTweets = async (username) => {

    const response = await fetch(`/api/twitter/tweets/${username}`)

    if (!response.ok) {
        throw new Error('Network Response failed.')
    }

    return response.json()

}

export default function useTweets(username) {
    return useQuery(["tweets", username], () => getUserTweets(username), {
        useErrorBoundary: true,
        staleTime: fifteenMinsinMS
    })
}
