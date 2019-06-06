export class PlanMitigasi {
    mitigasiid: number;
    riskid: number;
    rjppid: number;
    sid: number;
    prkid: number;
    mitigasi: string;
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
    mitigasiid: number;
    riskid: number;
    rjppid: number;
    sid: number;
    prkid: number;
    mitigasi: string;
  }
  