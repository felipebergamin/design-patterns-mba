import ContractRepository from "../../application/repository/ContractRepository";
import Contract from "../../domain/Contract";
import Payment from "../../domain/Payment";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ContractDatabaseRepository implements ContractRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async list(): Promise<Contract[]> {
    const contracts: Contract[] = [];
    const contractsList = await this.connection.query(
      "select * from felipebergamin.contract",
      []
    );
    for (const contractData of contractsList) {
      const contract = new Contract(
        contractData.id_contract,
        contractData.description,
        parseFloat(contractData.amount),
        contractData.periods,
        contractData.date
      );
      const paymentsList = await this.connection.query(
        "select * from felipebergamin.payment where id_contract = $1",
        [contract.idContract]
      );

      for (const paymentData of paymentsList) {
        contract.addPayment(
          new Payment(
            paymentData.id_payment,
            paymentData.date,
            parseFloat(paymentData.amount)
          )
        );
      }

      contracts.push(contract);
    }
    return contracts;
  }
}
