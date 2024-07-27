import Mediator from "../../infra/mediator/Mediator";
import JsonPresenter from "../../infra/presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import ContractRepository from "../repository/ContractRepository";
import UseCase from "./UseCase";

type Input = {
  month: number;
  year: number;
  type: "cash" | "accrual";
  format?: "json" | "csv";
};

export type Output = {
  date: Date;
  amount: number;
};

export default class GenerateInvoices implements UseCase {
  constructor(
    readonly contractRepository: ContractRepository,
    readonly presenter: Presenter = new JsonPresenter(),
    readonly mediator: Mediator = new Mediator(),
  ) {}

  async execute(input: Input): Promise<any> {
    const output: Output[] = [];
    const contracts = await this.contractRepository.list();

    for (const contract of contracts) {
      const invoices = await contract.generateInvoices(
        input.month,
        input.year,
        input.type
      );

      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount,
        });
      }
    }
    await this.mediator.publish("InvoicesGenerated", output);
    return this.presenter.present(output);
  }
}
