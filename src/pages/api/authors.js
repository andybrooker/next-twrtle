// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect'
import checkSession from '../../utils/checkSession'
import { prisma } from '../../lib/clients/prisma'

const authors = ['andy_brooker', 'jack', 'shreyas']

const handler = nextConnect()

handler.use(checkSession())
handler.get(async (req, res) => {

  try {

    const authors = await prisma.author.findMany({
      where: {
        users: {
          some: {
            userId: req.session.user.id
          }
        }
      }
    })

    res.status(200).send(authors)


  } catch (err) {
      res.status(500).json({ error: err.message})
  }


});

export default handler