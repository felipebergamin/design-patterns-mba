import moment from "moment";
import { Output } from "../../application/usecase/GenerateInvoices";
import Presenter from "../../application/presenter/Presenter";

export default class CsvPresenter implements Presenter {
  present(data: Output[]): string {
    const lines: string[] = [];
    for (const invoice of data) {
      const line: string[] = [];
      line.push(moment(invoice.date).format("YYYY-MM-DD"));
      line.push(String(invoice.amount));
      lines.push(line.join(";"));
    }
    return lines.join("\n");
  }
}
