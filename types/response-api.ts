import type { MetaInformations } from "./meta-information";

export interface ResponseApi<T> {
  data: T[];
  meta: MetaInformations;
}
