import type { IPage } from "./IPage";

export interface Page<T> {
  content: T[];
  page: IPage
}
