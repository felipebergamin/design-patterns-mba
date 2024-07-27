import express from "express";

import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(
    method: "post" | "get",
    url: string,
    callback: (params: any, body: any, headers: any) => any
  ): void {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body, req.headers);
      res.json(output).end();
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
