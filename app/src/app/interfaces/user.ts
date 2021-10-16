export interface User {
  code:string;
  population:string;
  postal_code:string;
  city: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  deleted?: boolean;
  _id?: string;
  __v?: number;
}
