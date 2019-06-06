export class Search {
  role_id: string;
  nama: string;
  keterangan: string;
  isallowregistration: boolean;
  menu: string;
}

export class Rolemenu {
  id: number;
  role_id: any;
  menu_id: any;
  createdby: string;
  createdate: string;
  updatedby: string;
  updatedate: string;
  grant_insert: any;
  grant_update: any;
  grant_delete: any;
  grant_select: any;
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

export class GetId {
  role_id: number;
  menu_id: number;
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
