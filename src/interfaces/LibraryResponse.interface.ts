export interface LibraryResponseInterface<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}
