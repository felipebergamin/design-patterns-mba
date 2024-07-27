import UseCase from "../../application/usecase/UseCase";
import HttpServer from "./HttpServer";

export default class MainController {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCase: UseCase,
  ) {
    httpServer.on('post', '/generate-invoices', async (params: any, body: any, headers: any) => {
      return this.useCase.execute(body);
    });
  }
}