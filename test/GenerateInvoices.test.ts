import GenerateInvoices from "../src/application/usecase/GenerateInvoices";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";
import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;

beforeAll(() => {
  // const contractRepository: ContractRepository = {
  //   list() {
  //     return Promise.resolve([
  //       {
  //         idContract: '',
  //         description: '',
  //         periods: 12,
  //         amount: '6000',
  //         date: new Date('2022-01-01T10:00:00'),
  //         payments: [
  //           {
  //             idPayment: '',
  //             idContract: '',
  //             amount: '6000',
  //             date: new Date('2022-01-05T10:00:00'),
  //           }
  //         ]
  //       }
  //     ])
  //   },
  // }
  connection = new PgPromiseAdapter();
  const contractRepository = new ContractDatabaseRepository(connection);
  generateInvoices = new GenerateInvoices(contractRepository);
});

afterAll(() => connection.close());

test('Deve gerar as notas fiscais por regime de caixa', async () => {

  const input = {
    month: 1,
    year: 2022,
    type: 'cash',
  } as const;
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toEqual(new Date('2022-01-05T13:00:00.000Z'));
  expect(output.at(0)?.amount).toBe(6000);
});

test('Deve gerar as notas fiscais por regime de competência', async () => {
  const input = {
    month: 1,
    year: 2022,
    type: 'accrual',
  } as const;
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toEqual(new Date('2022-01-01T13:00:00.000Z'));
  expect(output.at(0)?.amount).toBe(500);
});

test('Deve gerar as notas fiscais por regime de competência', async () => {
  const input = {
    month: 2,
    year: 2022,
    type: 'accrual',
  } as const;
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toEqual(new Date('2022-02-01T13:00:00.000Z'));
  expect(output.at(0)?.amount).toBe(500);
});

test('Deve gerar as notas fiscais por regime de competência por csv', async () => {
  const input = {
    month: 1,
    year: 2022,
    type: 'accrual',
    format: 'csv',
  } as const;
  const presenter = new CsvPresenter();
  const generateInvoices = new GenerateInvoices(new ContractDatabaseRepository(connection), presenter);
  const output = await generateInvoices.execute(input);
  expect(output).toBe('2022-01-01;500');
});
