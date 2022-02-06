import { Request } from "../classes";
import { ConfigType } from "../types/config.type";

export interface ClientInterface {
  setAuthentication(request: Request): void;
  globalHeaders(): Record<string, string>;
  config(): ConfigType;
}
