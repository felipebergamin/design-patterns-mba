import axios from "axios";

test('Deve gerar as faturas pela api', async () => {
  const input = {
    month: 1,
    year: 2022,
    type: 'cash',
  } as const;
  const response = await axios.post('http://localhost:3000/generate-invoices', input);
  expect(response.data.at(0)?.date).toBe('2022-01-05T13:00:00.000Z');
  expect(response.data.at(0)?.amount).toBe(6000);
});
