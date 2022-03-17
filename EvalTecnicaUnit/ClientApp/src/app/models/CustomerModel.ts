import { PhoneModel } from "./PhoneModel";

export class CustomerModel {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  contactPhoneNumber: string;
  gender: string;
  emailAddress: string;

  public phones: PhoneModel[]

  constructor() {
    this.phones = [];
  }

}
