export class Pengumuman {
    pid: number;
    isi: string;
    tgl_mulai: string;
    tgl_akhir: string;
    status: any;
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
    pid: number;
    isi: string;
    tgl_mulai: string;
    tgl_akhir: string;
    status: string;
  }
  