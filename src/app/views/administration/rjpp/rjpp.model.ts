export class Rjpp {
  rjppid: number;
  periode: string;
  description: string;
  notes: string;
  start_year: number;
  end_year: number;
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
    periode: string;
    start_year: string;
    end_year: string;
  }