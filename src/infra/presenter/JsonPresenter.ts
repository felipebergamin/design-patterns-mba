import Presenter from "../../application/presenter/Presenter";
import { Output } from "../../application/usecase/GenerateInvoices";

export default class JsonPresenter implements Presenter {
  present(data: Output[]): any {
    return data;
  }
}
