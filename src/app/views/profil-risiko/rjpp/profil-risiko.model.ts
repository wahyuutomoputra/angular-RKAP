export class ProfilRisiko {
    riskid: number;
    risiko: string;
    deskripsi: any;
    rjppid: number;
    sid: number;
    sifat: string;
    jenis: string;
    direktur_terkait: string;
    tingkat: string;
    dampak: string;
    kemungkinan: string;
    velositas: string;
    penyebab_interna: string;
    penyebab_eksternal: string;
    tipe_risiko: string;
    justifikasi_dampak: string;
    justifikasi_kemungkinan: string;
    mitigasi: string;
    taxoid: number;
    tahun: string;
    deptid: number;
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
    riskid: number;
    risiko: string;
    deskripsi: string;
    rjppid: string;
    sid: string;
    sifat: string;
    jenis: string;
    direktur_terkait: string;
    tingkat: string;
    dampak: string;
    kemungkinan: string;
    velositas: string;
    penyebab_interna: string;
    penyebab_eksternal: string;
    tipe_risiko: string;
    justifikasi_dampak: string;
    justifikasi_kemungkinan: string;
    mitigasi: string;
    taxoid: string;
    tahun: string;
    deptid: string;
  }
  