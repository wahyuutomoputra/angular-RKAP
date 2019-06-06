export class Users {
	userid: number;
	username: string;
	nama: string;
	password: string;
	jabatan_id: any;
	entitas_id: any;
	role_id: any;
	active: any;
	language_default_id: string;
	alamat: string;
	propinsi: string;
	kota: string;
	kecamatan: string;
	kelurahan: string;
	kodepos: string;
	nohp: string;
	email: string;
	description: string;
	photo_url: string;
	registration_by: string;
	registration_date: string;
	activation_by: string;
	activation_date: string;
	deactivation_by: string;
	deactivation_date: string;
	activation_code: string;
	modified_by: string;
	modified_date: string;
}

export class Search {
  role_id: string;
  nama: string;
  keterangan: string;
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

export class Provinsi{
	province_id: string;
	province: string;
}
