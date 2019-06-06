import { Component, ViewChild } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Order, TableService } from './_table';

import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule
} from 'devextreme-angular';

@Component({
  selector: 'app-table',
  providers: [TableService],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  orders: Order[];
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;

  private static getOrderDay(rowData) {
    return (new Date(rowData.OrderDate)).getDay();
  }

  constructor(service: TableService) {
    this.orders = service.getOrders();
    this.showFilterRow = true;
    this.showHeaderFilter = true;
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately'
    }, {
      key: 'onClick',
      name: 'On Button Click'
    }];
    this.saleAmountHeaderFilter = [{
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000]
    }, {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000]
      ]
    }, {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000]
      ]
    }, {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000]
      ]
    }, {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000]
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    const column = this as any;
    if (target === 'headerFilter' && value === 'weekends') {
      return [[TableComponent.getOrderDay, '=', 0], 'or', [TableComponent.getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: 'Weekends',
        value: 'weekends'
      });
      return results;
    };
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }

}
