export class Rkap {
    rjppid: number;
    sid: number;
    codeid: number;
    rkapid: any;
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
    rjppid: string;
    sid: string;
    codeid: string;
    rkapid: string;
  }
  
