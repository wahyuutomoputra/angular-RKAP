export class Visi {
  visi_id: number;
  visi: string;
  urutan: any;
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
  visi_id: string;
  visi: string;
  urutan: string;
}
