import { getSession } from 'next-auth/react'

export default function checkSession() {
    return async (req, res, next) => {
        const session = await getSession({ req })
        if (session) {
            req.session = session
            next()
        } else {
            return res.status(401)
        }
    }
}