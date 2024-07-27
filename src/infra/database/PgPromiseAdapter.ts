import pgPromise from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
  #connection: any;

  constructor() {
    this.#connection = pgPromise()(
      "postgres://postgres:mysecretpassword@localhost:5432/app"
    );
  }
  query(statement: string, params: any[]): Promise<any> {
    return this.#connection.query(statement, params);
  }
  close(): Promise<void> {
    return this.#connection.$pool.end();
  }

}