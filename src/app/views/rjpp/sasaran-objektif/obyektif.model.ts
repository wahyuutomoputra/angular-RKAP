export class Obyektif {
	rjppid: string;
	sid: number;
	parent_ssid: string;
	sasaran: string;
	indikator_nilai: string;
	satuanid: string;
	deskripsi: string;
	tahun: string;
	jenis_sasaran: string;
	indikator: string;
	perspektif: string;
	arah_pengembangan: string;
	created_date: string;
	created_by: string;
	updated_date: string;
	updated_by: string;
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
  visi_id: string;
  visi: string;
  urutan: string;
}
