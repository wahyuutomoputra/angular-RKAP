import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {RkapService} from '../rkap.service';
// import { AddRoleService } from './role-add.service';

import {Menu, Rkap, KategoriAktif} from '../rkap.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent, DxTreeViewModule, DxLoadPanelModule, DxListModule} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

@Component({
  selector: 'app-diskusi',
  templateUrl: './diskusi.component.html',
  styleUrls: ['./diskusi.component.scss'],
  providers: []
})
export class DiskusiComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() isEdit;
  @Input() isDetail;
  @Input() editItem;
  @Input() diskusiVisible;
  @Output() onHideAdd = new EventEmitter();
  @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;
  @ViewChild(DxFormComponent) formAktif: DxFormComponent;
  @ViewChildren(DxiItemComponent) kontrols: QueryList<DxiItemComponent>;
  @ContentChildren(DxiItemComponent) kontens: QueryList<DxiItemComponent>;

  role: Rkap;
  isallowregistration: boolean;
  simpleProducts: string[];
  daftarKategori: KategoriAktif[];
  // cekAktif: boolean;
  previousValue: boolean;
  newValue: boolean;
  isi =[];
  child =[];
  menu =[];
  masuk = 0;
  kosong = [];
  crud = [];
  authChild = [];
  authParent = [];

  ChildInsert = false;
  ChildUpdate = false;
  ChildSelect = false;
  ChildDelete = false;
  ParentDelete = false;
  ParentSelect = false;
  ParentUpdate = false;
  ParentInsert = false;
  Select = false;
  SelectParent = false;
  childId = null;
  parentId = null;
  allParent = [];



  // insert = false;
  // update = false;
  // select = false;
  // delete = false;
  // showContent = false;
  checkedItems: any = [];
  UncheckedItems: any = [];

  currentItem: any;
  loadingVisible = false;

  menuTree: Menu[] = [];

  confVisible = false;
  isSave = false;
  isCancel = false;
  gridDataSource: any = {};

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  };

  constructor(private rkapService: RkapService) {

  }

  getMenu(){
   //  dua
   //  this.roleService.getMenu()
   // .subscribe(resp => { 
   //   console.log(this.crud);
   //   for (let item of resp.d.list) {
   //     this.child = [];
   //     if (item.parent_menu_id == null) {
   //       for (let list of resp.d.list) {
   //          this.authChild  = [{id:list.menu_id+'69', value: "", text: "insert", selected: false},
   //                             {id:list.menu_id+'79', value: "", text: "select", selected: false}, 
   //                             {id:list.menu_id+'89', value: "", text: "update", selected: false},
   //                             {id:list.menu_id+'99', value: "", text: "delete", selected: false}];
   //          this.authParent = [{id:item.menu_id+'69', value: "", text: "insert", selected: false},
   //                             {id:item.menu_id+'79', value: "", text: "select", selected: false}, 
   //                             {id:item.menu_id+'89', value: "", text: "update", selected: false},
   //                             {id:item.menu_id+'99', value: "", text: "delete", selected: false}];
   //         for (let dml of this.crud) {
   //           if (dml.menuId==list.parent_menu_id) {
   //             this.authChild = [{id:list.menu_id+'69', value: dml.grant_Insert, text: "insert", selected: true},
   //                               {id:list.menu_id+'79', value: dml.grant_Select, text: "select", selected: true},
   //                               {id:list.menu_id+'89', value: dml.grant_Update, text: "update", selected: true},
   //                               {id:list.menu_id+'99', value: dml.grant_Delete, text: "delete", selected: true}];
   //           }
   //           if (dml.menuId==item.parent_menu_id) {
   //             this.authParent = [{id:item.menu_id+'69', value: dml.grant_Insert, text: "insert", selected: true},
   //                                {id:item.menu_id+'79', value: dml.grant_Select, text: "select", selected: true},
   //                                {id:item.menu_id+'89', value: dml.grant_Update, text: "update", selected: true},
   //                                {id:item.menu_id+'99', value: dml.grant_Delete, text: "delete", selected: true}];
   //           }
   //         }
   //         if (list.parent_menu_id == item.menu_id) {
   //           var a = { id: list.menu_id, text: list.menu_description, items: this.authChild };
   //           this.child.push(a);
   //         }
   //       }
   //       if (this.child === undefined || this.child.length == 0) {
   //         var b = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.authParent  };
   //         this.isi.push(b);
   //       }else{
   //         var c = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.child };
   //         this.isi.push(c);
   //       }
   //     }
   //   }
   //   console.log(this.isi)
   // }, err => {
   //   console.log(err);
   // })
   
   //  satu
   //  this.roleService.getMenu()
   // .subscribe(resp => { 
   //   for (let item of resp.d.list) {
   //     this.child = [];
   //     if (item.parent_menu_id == null) {
   //       for (let list of resp.d.list) {
   //         if (list.parent_menu_id == item.menu_id) {
   //           var a = { id: list.menu_id, text: list.menu_description };
   //           this.child.push(a);
   //         }
   //       }
   //       if (this.child === undefined || this.child.length == 0) {
   //         var b = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id,  };
   //         this.isi.push(b);
   //       }else{
   //         var c = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.child };
   //         this.isi.push(c);
   //       }
   //     }
   //   }
   //   console.log(this.isi); 
   // }, err => {
   //   console.log(err);
   // })

  //   this.roleService.getMenu()
  //  .subscribe(resp => { 
  //    for (let item of resp.d.list) {
  //      this.child = [];
  //      this.ParentDelete = false;
  //        this.ParentInsert = false;
  //        this.ParentSelect = false;
  //        this.ParentUpdate = false;
  //        this.authParent  = [{id:item.menu_id+'69', menuId: "", value: "", text: "insert", selected: false},
  //                            {id:item.menu_id+'79', menuId: "", value: "", text: "select", selected: false}, 
  //                            {id:item.menu_id+'89', menuId: "", value: "", text: "update", selected: false},
  //                            {id:item.menu_id+'99', menuId: "", value: "", text: "delete", selected: false}];
  //      if (item.parent_menu_id == null) {
  //        for (let list of resp.d.list) {
  //          //search child of parent
  //          if (list.parent_menu_id == item.menu_id) {
  //            this.ChildInsert = false;
  //            this.ChildUpdate = false;
  //            this.ChildSelect = false;
  //            this.ChildDelete = false;
  //            this.authChild   = [{id:list.menu_id+'69', menuId: "", value: "", text: "insert", selected: false},
  //                                {id:list.menu_id+'79', menuId: "", value: "", text: "select", selected: false}, 
  //                                {id:list.menu_id+'89', menuId: "", value: "", text: "update", selected: false},
  //                                {id:list.menu_id+'99', menuId: "", value: "", text: "delete", selected: false}];
  //            for (let dml of this.crud) {
  //              if (dml.menuId==list.menu_id) {
  //                this.ChildInsert = dml.grant_Insert == 1 ? true : false;
  //                this.ChildUpdate = dml.grant_Update == 1 ? true : false;
  //                this.ChildSelect = dml.grant_Select == 1 ? true : false;
  //                this.ChildDelete = dml.grant_Delete == 1 ? true : false;
  //                this.authChild   = [{id:list.menu_id+'69', menuId: dml.menu_Id, value: dml.grant_Insert, text: "insert", selected: this.ChildInsert},
  //                                    {id:list.menu_id+'79', menuId: dml.menu_Id, value: dml.grant_Select, text: "select", selected: this.ChildSelect},
  //                                    {id:list.menu_id+'89', menuId: dml.menu_Id, value: dml.grant_Update, text: "update", selected: this.ChildUpdate},
  //                                    {id:list.menu_id+'99', menuId: dml.menu_Id, value: dml.grant_Delete, text: "delete", selected: this.ChildDelete}];
  //              }
               
  //            }
  //            var a = { id: list.menu_id, text: list.menu_description, items: this.authChild };
  //            this.child.push(a);
  //          }
  //        }
  //        for (let dml2 of this.crud) {
  //          if (dml2.menuId==item.menu_id) {
  //                console.log('masuk');
  //                this.ParentInsert = dml2.grant_Insert == 1 ? true : false;
  //                this.ParentUpdate = dml2.grant_Update == 1 ? true : false;
  //                this.ParentSelect = dml2.grant_Select == 1 ? true : false;
  //                this.ParentDelete = dml2.grant_Delete == 1 ? true : false;
  //                this.authParent  = [{id:item.menu_id+'69', menuId: dml2.menu_Id, value: "", text: "insert", selected: this.ParentInsert},
  //                                    {id:item.menu_id+'79', menuId: dml2.menu_Id, value: "", text: "select", selected: this.ParentSelect}, 
  //                                    {id:item.menu_id+'89', menuId: dml2.menu_Id, value: "", text: "update", selected: this.ParentUpdate},
  //                                    {id:item.menu_id+'99', menuId: dml2.menu_Id, value: "", text: "delete", selected: this.ParentDelete}];
  //              }
  //        }
  //        if (this.child === undefined || this.child.length == 0) {
  //          //set parent only
  //          var b = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.authParent };
  //          this.isi.push(b);
  //        }else{
  //          //set parent with child
  //          var c = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.child };
  //          this.isi.push(c);
  //        }
  //      }
  //    }
  //    console.log(this.isi); 
  //  }, err => {
  //    console.log(err);
  //  })
   }

  // getList(){
  //  this.rkapService.getMenu()
  //  .subscribe(resp => { 
  //    for (let item of resp.d.list) {
  //      this.child = [];
  //      this.SelectParent = false;
  //      this.parentId = null;

  //      if (item.parent_menu_id == null) {
  //        for (let list of resp.d.list) {
  //          if (list.parent_menu_id == item.menu_id) {
  //            this.Select = false;
  //            this.childId = null;
  //            for (let dml of this.crud) {
  //              if (dml.menuId==list.menu_id) {
  //                this.Select = true;
  //                this.childId = dml.id;
  //                this.select({ key: list.menu_id, text: list.menu_description, selected: this.Select, items: [], rolemenu: this.childId });
  //              }
  //            }
  //            var a = { id: list.menu_id, text: list.menu_description, selected: this.Select, items: [], rolemenu: this.childId };
  //            this.child.push(a);
  //          }
  //        }

  //        for (let dml2 of this.crud) {
  //          if (dml2.menuId==item.menu_id && this.child === undefined) {
  //            this.SelectParent = true;
  //            this.parentId = dml2.id;
  //            this.select({ key: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, selected: this.SelectParent, items: [], rolemenu: this.parentId  });
  //          }
  //        }

  //        if (this.child === undefined || this.child.length == 0) {
  //          var b = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, selected: this.SelectParent, items: [], rolemenu: this.parentId  };
  //          this.isi.push(b);
  //        }else{
  //          this.allParent.push(item.menu_id);
  //          var c = { id: item.menu_id, text: item.menu_description, parent_menu_id: item.parent_menu_id, items: this.child, rolemenu: this.parentId };
  //          this.isi.push(c);
  //        }
  //      }
  //    }
  //    console.log(this.isi); 
  //  }, err => {
  //    console.log(err);
  //  })
  //  console.log(this.allParent)
  // }

  // getCheked(id){
  //   this.rkapService.getMenuId(id)
  //  .subscribe(resp => { 
  //    this.crud = resp.d;
  //    console.log(this.crud);
  //  }, err => {
  //    console.log(err);
  //  })
  // }

  selection(e){
    this.selectionChanged(e);
    console.log(e.node.selected);
    if (e.node.selected==false) {
      console.log("run");
      this.selectionFalse(e);
    }
  }

  select(e) {
       let value = e;
       console.log(value);
       if (this.isProduct(value)) {
           this.processProduct({
               id: value.key,
               text: value.text,
               selected: value.selected,
               itemData: value.itemData,
            
           });
       } else {
           value.items.forEach((product, index) => {
               this.processProduct({
                   id: product.key,
                   text: product.text,
                   selected: product.selected,
                   itemData: value.itemData,
               });
           });
       }
   }

  selectionChanged(e) {
       let value = e.node;
       console.log(value);
       if (this.isProduct(value)) {
           this.processProduct({
               id: value.key,
               text: value.text,
               selected: value.selected,
               itemData: value.itemData,
           });
       } else {
           value.items.forEach((product, index) => {
               this.processProduct({
                   id: product.key,
                   text: product.text,
                   selected: product.selected,
                   itemData: value.itemData,
               });
           });
       }
   }

   isProduct(data) {
       return !data.items.length;
   }

   processProduct(product) {
     console.log('tambah');
       let itemIndex = -1;
     
       this.checkedItems.forEach((item, index) => {
           if (item.id === product.id) {
               itemIndex = index;
               return false;
           }
       });
       this.UncheckedItems.forEach((item, index) => {
           if (item.id === product.id) {
               this.UncheckedItems.splice(index, 1);
           }
       });
       if (product.selected && itemIndex === -1) {
           this.checkedItems.push(product);
       } else if (!product.selected) {
           this.checkedItems.splice(itemIndex, 1);
       }
   }

   selectionFalse(e) {
       let value = e.node;
       console.log(value);
       this.UncheckedItems.push({
               id: value.key,
               text: value.text,
               selected: value.selected,
               itemData: value.itemData,
           });
   }

  ngOnInit() {  
    //this.getMenu();

  }

  ngAfterViewInit() {
   // console.log(this.kontrols);
   this.kontrols.forEach((item) => {
     // console.log('name = ' + item.name + ' datafield = ' + item.dataField + ', editorType = ' + item.editorType);
   });
 }

 ngAfterContentInit() {
   
 }

  addToMenu(item) {
    if (!this.menuTree.length) {
      this.menuTree = [];
    }
    this.menuTree.push(item);
  }

  save(e) {
    this.confVisible = true;
    this.isSave = true;
    this.isCancel = false;

    e.preventDefault();
  }
  cancel() {
    this.confVisible = true;
    this.isSave = false;
    this.isCancel = true;
  }
  onHideConf() {
    this.confVisible = false;
  }
  
  onSaveConf() {
    var insert = this.checkedItems;
    var del = this.UncheckedItems;

     for(let item of this.crud){
       this.checkedItems.forEach((data,index)=>{
         if (item.menuId==data.id) {
           insert.splice(index,1);
         }
       });
     }

    // for(let item of insert){
    //   console.log(item)
    //   this.rolemenu = {
    //     id: null,
    //     role_id: this.editItem,
    //     menu_id: item.id,
    //     createdby: localStorage.getItem('username').toUpperCase(),
    //     createdate: new Date().toISOString().slice(0, 10),
    //     updatedby: null,
    //     updatedate: null,
    //     grant_insert: '1',
    //     grant_update: '1',
    //     grant_delete: '1',
    //     grant_select: '1',
    //  };
    //  this.rkapService.saveMenu(this.rolemenu).subscribe(resp => {
    //    console.log(resp);
    //   }, err => {
    //  console.log(err);
    //  })
    // }
    // for(let hapus of del){
    //   this.rkapService.deleteAuth(hapus.itemData.rolemenu).subscribe(resp => {
    //    console.log(resp);
    //   }, err => {
    //  console.log(err);
    //  })
    // }
    
    
    
    // console.log(hapus);
    // this.roleService.save(this.checkedItems).subscribe(resp => {

    // })
    // this.treeList.instance.saveEditData();
    // this.role.nama = this.role.nama.toUpperCase();
    // console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
    // const nilai: number = this.role.isdisplayed;
    // this.role.isdisplayed = nilai.toString();
    // let success = false;
    // if (!this.isEdit) {
    //   this.role.role_id = null;
    //   this.roleService.save(this.role).subscribe(resp => {
    //     console.log(resp);
    //     success = true;
    //     this.menuTree.forEach(menuItem => {
    //       if (menuItem.read || menuItem.write) {
    //         let read = 'N', write = 'N';
    //         if (menuItem.read) {
    //           read = 'Y';
    //         }
    //         if (menuItem.write) {
    //           write = 'Y';
    //         }
    //         this.roleService.saveRoleAuth({
    //           read: read,
    //           write: write,
    //           menuTab: {id: menuItem.menuId},
    //           userRole: {id: resp.id}
    //         }).subscribe(() => {}, () => {
    //           success = false;
    //         })
    //       }
    //     });

    //     if (success) {
    //       // this.options.message = 'Role saved';
    //       // notify(this.options, 'success', 3000);
    //       notify({message: 'Role berhasil disimpan', position: {my: 'center top', at: 'center top'}},
    //        'success', 3000);
    //       this.hide();
    //     } else {
    //       this.options.message = 'Saving Failed';
    //       notify(this.options, 'error', 3000);
    //     }
    //   }, err => {
    //     this.options.message = 'Saving Failed';
    //     notify(this.options, 'error', 3000);
    //   })
    // } else {
    //   this.roleService.update(this.role).subscribe(resp => {
    //    console.log(this.role);
    //    success = true;

    //     this.menuTree.forEach(menuItem => {
    //       if (menuItem.read || menuItem.write) {
    //         let read = 'N', write = 'N';
    //         if (menuItem.read) {
    //           read = 'Y';
    //         }
    //         if (menuItem.write) {
    //           write = 'Y';
    //         }

    //         if (typeof menuItem.authId === 'undefined') {
    //          this.roleService.saveRoleAuth({
    //            read: read,
    //            write: write,
    //            menuTab: { id: menuItem.menuId },
    //            userRole: { id: resp.id }
    //          }).subscribe(() => { }, () => {
    //            success = false;
    //          })
    //        } else {
    //          this.roleService.updateRoleAuth({
    //            authId: menuItem.authId,
    //            read: read,
    //            write: write,
    //            menuTab: { id: menuItem.menuId },
    //            userRole: { id: resp.id }
    //          }).subscribe(() => { }, () => {
    //            success = false;
    //          })
    //        }
    //       } else {
    //         if (typeof menuItem.authId !== 'undefined') {
    //           this.roleService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
    //             success = false;
    //           });
    //         }
    //       }
    //     });

    //     if (success) {
    //       this.options.message = 'Role updated';
    //       notify(this.options, 'success', 3000);
    //       this.hide();
    //     } else {
    //       this.options.message = 'Updating Failed';
    //       notify(this.options, 'error', 3000);
    //     }
    //     }, err => {
    //       this.options.message = 'Updating Failed';
    //       notify(this.options, 'error', 3000);
    //     }
    //   )
    // }
  }
  onCancelConf() {
    this.diskusiVisible = false;
    this.hide();
  }
  hide() {
    this.onHideAdd.emit();
  }

  toolbarPreparing(e) {
    e.toolbarOptions.visible = false;
  }

  cellClick(e) {
    this.treeList.instance.saveEditData();
  }

  rowUpdated(e) {
    console.log('updated', e, this.menuTree);
    const menuChecked = this.menuTree.find(menu => menu.menuId === e.key);

    this.menuTree.forEach((menu, index) => {
      if (menu.menuParent === e.key) {
        if (typeof e.data.read !== 'undefined') {
          this.menuTree[index].read = e.data.read;
        }
        if (typeof e.data.write !== 'undefined') {
          this.menuTree[index].write = e.data.write;
        }
      }
    })

    if (typeof menuChecked.menuParent !== 'undefined') {
      const menuChild = this.menuTree.filter(menu => menu.menuParent === menuChecked.menuParent);

      let read = 0, write = 0;
      menuChild.forEach(menu => {
        // console.log(menu)
        if (menu.read) {
          read++;
        }

        if (menu.write) {
          write++;
        }
      })

      if (read > 0) {
        this.menuTree.forEach((menu, index) => {
          if (menu.menuId === menuChecked.menuParent) {
            this.menuTree[index].read = true;
          }
        })
      }

      if (write > 0) {
        this.menuTree.forEach((menu, index) => {
          if (menu.menuId === menuChecked.menuParent) {
            this.menuTree[index].write = true;
          }
        })
      }
    }
  }
}
