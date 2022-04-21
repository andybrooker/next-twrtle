// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors";
import initMiddleware from "../../../utils/initMiddleware";
import got from "got";
const puppeteer = require("puppeteer");

const cors = Cors({
  methods: ["GET", "HEAD"],
});

const metascraper = require("metascraper")([
  require("metascraper-title")(),
  require("metascraper-image")(),
  require("metascraper-description")(),
]);

async function handler(req, res) {
  await initMiddleware(req, res, cors);

  if (req.method === "POST") {
    const targetUrl = req.body.url;

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto("https://example.org/", { waitUntil: "networkidle0" });
    // const data = await page.evaluate(
    //   () => document.querySelector("*").outerHTML
    // );

    const { body: html, url } = await got(targetUrl);

    const metadata = await metascraper({ html, url });

    res.status(200).send(metadata);
  }
}

export default handler;
