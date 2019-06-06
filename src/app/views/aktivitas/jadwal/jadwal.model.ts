export class Jadwal {
	jadwalid: number;
	deskripsi: string;
	tipe_jadwal: string;
	tgl_mulai: string;
	tgl_akhir: string;
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
  jadwalid: string;
	deskripsi: string;
	tipe_jadwal: string;
	tgl_mulai: string;
	tgl_akhir: string;
}

export class Appointment {
  text: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
}

