import Address, { DatabaseAddress } from './address';
import Contact from './contact';

export interface BaseRegistry {
  name: string;
  type: 'natural' | 'legal';
  cpf: string;
  uuid: string;
  cnpj?: string;
}

export default interface Registry extends Omit<BaseRegistry, 'uuid'> {
  address: Address;
  contact: Contact;
}

export interface DatabaseRegistry {
  registry: BaseRegistry;
  address: DatabaseAddress;
  contact: Contact;
}
