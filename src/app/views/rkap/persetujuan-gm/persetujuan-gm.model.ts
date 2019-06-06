export class PersetujuanGm {
    rjppid: number;
    sid: number;
    prkid: number;
    rkapid: number;
    program_kerja: any;
    deskripsi: any;
    jenis_anggaran: any;
    tipe_rkap: any;
    no_kontrak_existing: any;
    tgl_akhir_kontak: any;
    nilai_kontak: any;
    usulan_anggaran: any;
    gid: number;
    prioritas: any;
    no_io: any;
    plan_tgl_mulai: any;
    plan_tgl_akhir: any;
    indikator_outcome: any;
    lokasi: any;
    deptid: any;
    jenis_oca: any;
    nilai_rkap: any;
    mata_uang_kontrak: any;
    riskid: any;
    mata_uang: any;
}

export class IndikatorInput{
  indikator: any;
  nilai: any;
  satuanid: number;
  deptid: number;
}

export class IndikatorOutput{
  indikator: any;
  nilai: any;
  satuanid: number;
}

export class DokumenRkap{
  nama_dokumen: any;
  jenis_file: any;
  link_dok: any;
}

export class Rab{
  rincian: any;
  volume: any;
  nilai: any;
  satuanid: number;
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
    prkid: string;
    rkapid: string;
  }
  
