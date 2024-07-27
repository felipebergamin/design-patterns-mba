import moment from "moment";

import Contract from "./Contract";
import Invoice from "./Invoice";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";

export default class CashBasisStrategy extends InvoiceGenerationStrategy {
  generate(contract: Contract, month: number, year: number): Invoice[] {
    const invoices: Invoice[] = [];
    for (const payment of contract.getPayments()) {
      if (
        payment.date.getMonth() + 1 !== month ||
        payment.date.getFullYear() !== year
      ) {
        continue;
      }
      invoices.push(new Invoice(
        moment(payment.date).toDate(),
        payment.amount,
      ));
    }

    return invoices;
  }
}
