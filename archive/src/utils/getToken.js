import { prisma } from '../lib/clients/prisma'

export default function getToken() {
    return async (req, res, next) => {

        const account = await prisma.account.findUnique({
            where: {
                provider_userId: {
                    provider: 'twitter',
                    userId: req.session.user.id
                }
            }
        })

        req.token = {
            twitter: {
                token: account.oauth_token,
                secret: account.oauth_token_secret
            }

        }

        if (req.token) {
            next()
        } else {
            return res.status(401)
        }
    }
}
