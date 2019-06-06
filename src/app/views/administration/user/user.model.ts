export class Search {
  name: String;
  userId: String;
  siteCode: String;
  roleId: String;
  email: String;
}
export class User {
  id: string;
  siteCode: string;
  siteCodeExist: string;
  roleId: number;
  userId: string;
  name: string;
  languageDefaultId: string;
  locationTypeId: string;
  telephone1: number;
  telephone2: number;
  state: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  passwd?: string;
  photoUrl: string;
  formUser: string;
  country: string;
  facsimile: string;
  status: any;
  ldap: string;
  activationCode: string;
  companyCode: string;
}
