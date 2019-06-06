export class Rkap {
    rjppid: any;
    sid: any;
    prkid: any;
    rkapid: any;
    program_kerja: string;
    deskripsi: string;
    jenis_anggaran: string;
    tipe_rkap: string;
    no_kontrak_existing: string;
    tgl_akhir_kontak: string;
    nilai_kontrak: any;
    usulan_anggaran: any;
    gid: any;
    prioritas: string;
    no_io: string;
    plan_tgl_mulai: string;
    plan_tgl_akhir: string;
    indikator_outcome: string;
    lokasi: string;
    deptid: any;
    jenis_oca: string;
    nilai_rkap: any;
    mata_uang_kontrak: string;
    riskid: any;
    mata_uang: string;
}

export class IndikatorInput{
  rkapid: any;
  indikator: string;
  nilai: any;
  satuanid: any;
  deptid: any;
  indid: any;
}

export class IndikatorInputUp{
  rkapid: any;
  indikator: any;
  nilai: any;
  satuanid: any;
  deptid: any;
  indid: any;
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
  satuanid: any;
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
  
