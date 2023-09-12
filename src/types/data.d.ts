export interface DataType {
  type: string;
  version: number;
  response: ResponseType;
}

export interface ResponseType {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
