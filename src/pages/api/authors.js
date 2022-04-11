// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import checkSession from "../../utils/checkSession";
import { prisma } from "../../lib/clients/prisma";
import getAuthors from "../../utils/getAuthors";
import getToken from "../../utils/getToken";
import createTwitter from "../../utils/createTwitter";

const handler = nextConnect();

handler.use(checkSession());
handler.use(getToken());
handler.use(createTwitter());
handler
  .get(async (req, res, next) => {
    try {
      const authors = await prisma.author.findMany({
        where: {
          users: {
            some: {
              userId: req.session.user.id,
            },
          },
        },
      });

      req.authors = authors;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const author = await prisma.author.upsert({
        where: {
          id: req.body.id,
        },
        update: {
          users: {
            connectOrCreate: [
              {
                create: {
                  userId: req.session.user.id,
                },
                where: {
                  userId_authorId: {
                    userId: req.session.user.id,
                    authorId: req.body.id,
                  },
                },
              },
            ],
          },
        },
        create: {
          username: req.body.username,
          id: req.body.id,
          users: {
            connectOrCreate: [
              {
                create: {
                  userId: req.session.user.id,
                },
                where: {
                  userId_authorId: {
                    userId: req.session.user.id,
                    authorId: req.body.id,
                  },
                },
              },
            ],
          },
        },
      });

      res.json(author);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    const {
      removeAuthor: { id },
    } = req.body;

    try {
      console.log(req.body);
      const author = await prisma.userAuthors.delete({
        where: {
          userId_authorId: {
            userId: req.session.user.id,
            authorId: id,
          },
        },
      });

      res.json(author);
    } catch (e) {
      console.log(e);
    }
  });

handler.use(getAuthors());

export default handler;
