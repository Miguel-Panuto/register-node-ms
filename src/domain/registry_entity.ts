import { v4 } from 'uuid';
import Address from 'src/@types/modules/address';
import Contact from 'src/@types/modules/contact';
import Registry from 'src/@types/modules/registry';

export default class RegistryEntity {
  private name: string;
  private type: 'natural' | 'legal';
  private cpf: string;
  private uuid: string;
  private cnpj?: string;
  private _address: Address;
  private _contact: Contact;

  constructor(registry: Registry) {
    this.name = registry.name;
    this.type = registry.type;
    this.cpf = registry.cpf.replace('.', '').replace('-', '');
    this.uuid = v4();
    if (registry.type === 'legal') {
      if (!registry.cnpj) throw new Error('CNPJ not defined');
      this.cnpj = registry.cnpj.replace('.', '').replace('/', '').replace('-', '');
    }
    this._address = registry.address;
    this._contact = registry.contact;
  }

  get registry() {
    return {
      name: this.name,
      type: this.type,
      cpf: this.cpf,
      uuid: this.uuid,
      cnpj: this.cnpj,
    };
  }

  get address() {
    return {
      ...this._address,
      number: this._address.number.toString(),
    };
  }

  get contact() {
    return this._contact;
  }
}
