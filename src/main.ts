import LoggerDecorator from "./application/decorator/LoggerDecorator";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import SendMail from "./application/usecase/SendEmail";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import Mediator from "./infra/mediator/Mediator";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const mediator = new Mediator();
const sendMail = new SendMail();

mediator.on("InvoicesGenerated", (data: any) => sendMail.execute(data));
const generateInvoices = new LoggerDecorator(
  new GenerateInvoices(contractRepository, new JsonPresenter(), mediator)
);
const httpServer = new ExpressAdapter();

new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
