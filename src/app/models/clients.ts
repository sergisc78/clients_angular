export class Client {
  _id?: number;
  name: string;
  email: string;
  telephone: number;
  country: string;

  constructor(name: string, email: string, telephone: number, country: string) {
    this.name = name;
    this.email = email;
    this.telephone = telephone;
    this.country = country;
  }
}
