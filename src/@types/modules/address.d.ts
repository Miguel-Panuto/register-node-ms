export default interface Address {
  street: string;
  number: string | number;
  complement?: string;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
}

export interface DatabaseAddress extends Omit<Address, 'number'> {
  number: string;
}
