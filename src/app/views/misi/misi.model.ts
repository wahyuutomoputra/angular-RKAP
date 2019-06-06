export class Misi {
  misi_id: number;
  misi: string;
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
  misi_id: number;
  misi: string;
  urutan: string;
}
