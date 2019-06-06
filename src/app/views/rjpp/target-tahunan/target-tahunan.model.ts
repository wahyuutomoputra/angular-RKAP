export class TargetTahunan {
	tid: number;
	tahun: string;
	rjppid: string;
	sid: string;
	indikator: string;
	indikator_nilai: string;
	indikator_satuan: string;
}

export class KategoriAktif {
  ID: number;
  Nama: string;
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

export class Search {
  	tid: number;
	tahun: string;
	rjppid: string;
}
