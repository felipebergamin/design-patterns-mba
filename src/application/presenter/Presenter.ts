import { Output } from "../usecase/GenerateInvoices";

export default interface Presenter {
  present(data: Output[]): any;
}
