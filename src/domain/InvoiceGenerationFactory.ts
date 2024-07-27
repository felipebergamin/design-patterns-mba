import AccrualBasisStrategy from "./AccrualBasisStrategy";
import CashBasisStrategy from "./CashBasisStrategy";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";

export default class InvoiceGenerationFactory {
  static create(type: 'accrual' | 'cash'): InvoiceGenerationStrategy {
    if (type === 'accrual') {
      return new AccrualBasisStrategy();
    }
    if (type === 'cash') {
      return new CashBasisStrategy();
    }
    throw new Error('Invalid type');
  }
}
