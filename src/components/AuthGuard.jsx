import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import LoadingPage from "./LoadingPage"

export function AuthGuard({ children }) {

    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {

        if (status !== 'loading' && !session) {
            router.push("/login")
        }

    }, [router, status, session]);

    if (status == 'loading' || !session) {
        return <LoadingPage />
    }

    return children;
}