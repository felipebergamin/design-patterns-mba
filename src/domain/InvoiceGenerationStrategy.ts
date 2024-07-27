import Contract from "./Contract";
import Invoice from "./Invoice";

export default class InvoiceGenerationStrategy {

  generate(contract: Contract, month: number, year: number): Invoice[] {
    throw new Error("Method not implemented.");
  }
}
