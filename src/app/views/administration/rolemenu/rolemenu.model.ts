export class Search {
  id: string;
  role_id: string;
  menu_id: string;
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
