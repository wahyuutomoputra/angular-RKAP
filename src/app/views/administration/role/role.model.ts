export class Search {
  role_id: string;
  nama: string;
  keterangan: string;
  isallowregistration: boolean;
  menu: string;
}

export class Role {
  role_id: number;
  nama: string;
  keterangan: string;
  isallowregistration: any = 'Y';
  isdisplayed: any = 1;
  activationCode: string;
  createdby: string;
  createdate: string;
  updatedby: string;
  updatedate: string;
}

export class Menu {
  authId?: string;
  menuParent?: string;
  menuId: string;
  read: any;
  write: any;
  text: string;
  items?: Menu[];
}

export class KategoriAktif {
  ID: number;
  Nama: string;
}
