import { Component, ViewChild } from '@angular/core';
import { TemplateService, Template } from './_template';
import { ContextItemService, ContextItem } from './_contextItems';
import { error } from 'selenium-webdriver';

import {
  DxContextMenuModule,
  DxPopupModule,
  DxProgressBarModule
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { SharedModule } from '../../shared/shared.module';
import { TabComponent } from './tab/tab.component';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  providers: [TemplateService, ContextItemService]
})
export class TemplateComponent {
  dataSource: Template[];
  contextItems: any;
  target: any;
  menuVisible = false;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  detail: any;
  text: any;
  progressTitle: any;
  progressContent: any;

  constructor(
    service: TemplateService,
    CIservice: ContextItemService
  ) {
    this.dataSource = service.getTemplates();
    this.contextItems = CIservice.getContextItems();
  }

  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    this.detail = this.dataSource.filter(dataSource => dataSource.tikurId === event)[0]
    console.log('this.detail : ', this.detail);
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      console.log('text: ', this.text)
      if (this.text === 'Detail') {
        this.popupVisible = true;
        console.log('popupVisible: ', this.popupVisible)
      } else if (this.text === 'Activate') {
        notify({
          closeOnClick: true,
          displayTime: 50000,
          message: 'The ' + this.text + ' item was clicked'
        }, 'success');
      } else if (this.text === 'Deactivate') {
        notify('The ' + this.text + ' item was clicked', 'info', 1500);
        this.confVisible = true;
      } else if (this.text === 'Ping! Modem') {
        notify('The ' + this.text + ' item was clicked', 'error', 1500);
        this.progressVisible = true;
        this.progressTitle = this.text;
        const titles = this.progressTitle.split(' ');
        this.progressContent = 'Sending ' + titles[0] + ' command to ' + titles[1] + ' ' + this.detail.tikurId;
      } else if (this.text === 'Ping! Meter') {
        notify('The ' + this.text + ' item was clicked', 'warning', 1500);
        this.progressVisible = true;
        this.progressTitle = this.text;
        const titles = this.progressTitle.split(' ');
        this.progressContent = 'Sending ' + titles[0] + ' command to ' + titles[1] + ' ' + this.detail.tikurId;
      }
    }
  }
  delete() {
    console.log('delete');
  }
  cancel() {
    console.log('cancel');
  }

  onHidePopup() {
    this.popupVisible = false;
  }

  onHideConf() {
    this.confVisible = false;
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }


}
