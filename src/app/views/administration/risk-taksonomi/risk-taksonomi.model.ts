export class RiskTaksonomi {
    taxoid: number;
    gid: number;
    taksonomi: any;
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
    taxoid: string;
    gid: string;
    taksonomi: string;
  }
  