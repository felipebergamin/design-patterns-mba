import Invoice from "./Invoice";
import Payment from "./Payment";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";
import InvoiceGenerationFactory from "./InvoiceGenerationFactory";

export default class Contract {
  private payments: Payment[];

  constructor(
    readonly idContract: string,
    readonly description: string,
    readonly amount: number,
    readonly periods: number,
    readonly date: Date,
  ) {
    this.payments = [];
  }

  addPayment(payment: Payment) {
    this.payments.push(payment);
  }

  getPayments(): Payment[] {
    return this.payments;
  }

  generateInvoices(month: number, year: number, type: 'accrual' | 'cash'): Invoice[] {
    const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type);
    return invoiceGenerationStrategy.generate(this, month, year);
  }

  getBalance(): number {
    let balance = this.amount;
    for (const payment of this.payments) {
      balance -= payment.amount;
    }
    return balance;
  }
}