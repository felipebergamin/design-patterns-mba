export default interface HttpServer {
  on(method: string, url: string, callback: (params: any, body: any, headers: any) => any): void;

  listen(port: number): void;
}