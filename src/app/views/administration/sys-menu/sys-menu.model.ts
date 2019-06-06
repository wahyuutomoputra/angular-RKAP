export class Search {
  	menu_id: string;
	parent_menu_id: string;
	menu_description: string;
	menu_address: string;
	active: string;
	jenis_object: string;
	expanded: string;
	menu_order: string;
	icon_style: string;
	registration_by: string;
}

export class SysMenu {
	menu_id: number;
	parent_menu_id: any;
	menu_description: string;
	menu_address: string;
	active: any = 1;
	jenis_object: string;
	expanded: any;
	menu_order: string;
	icon_style: string;
	registration_by: string;
	registration_date: string;
	modified_by: string;
	modified_date: string;
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