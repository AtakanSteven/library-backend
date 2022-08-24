import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerService extends ConsoleLogger {
  customLog(id) {
    this.log(`unique id of the request: ${id}`);
  }
}
