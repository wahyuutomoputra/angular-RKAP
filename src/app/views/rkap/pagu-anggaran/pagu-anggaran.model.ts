export class PaguAnggaran {
    pagu_id: number;
    deptid: number;
    tahun: any;
    nilai_pagu: number;
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
    pagu_id: number;
    deptid: number;
    tahun: any;
    nilai_pagu: number;
  }
  