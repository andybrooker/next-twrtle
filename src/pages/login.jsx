import React, { useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
          router.replace('/edition')
        }
    }, [session, router])

    return (
        <div>
            Login
        </div>
    )
}
