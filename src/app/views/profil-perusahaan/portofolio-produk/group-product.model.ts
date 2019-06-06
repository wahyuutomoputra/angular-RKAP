export class GroupProduct {
  gid: number;
  parent_gid: string;
  kode: string;
  nama: string;
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
  
  export class Search {
    gid: string;
    kode: string;
    nama: string;
  }