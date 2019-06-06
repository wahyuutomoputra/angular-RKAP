export class Sasaran {
    rjppid: number;
    sid: number;
    parent_ssid: any;
    sasaran:string;
    indikator_nilai:string;
    indikator_satuan: string;
    deskripsi: string;
    tahun: number;
    jenis_sasaran: string;
    indikator: string;
    perspektif: string;
    arah_pengembangan: string;
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
    sid: number;
    sasaran : string;
    jenis_sasaran : string;
    //urutan: string;
  }
  