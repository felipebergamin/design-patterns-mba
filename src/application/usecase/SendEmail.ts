
export default class SendMail {
  constructor() {}

  execute(input: any): Promise<any> {
    console.log("Sending email: ", input);  
    return Promise.resolve();
  }
}