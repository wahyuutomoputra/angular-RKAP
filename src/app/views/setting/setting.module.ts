import { NgModule } from '@angular/core';
import { SettingRoutingModule } from './setting-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import {
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
    /* auto complete test */
    DxAutocompleteModule,
    DxTextBoxModule,
    DxPivotGridModule,
    DxChartModule,
    DxMapModule,
    DxTreeListModule,
    DxFileUploaderModule,
    DxLoadIndicatorModule,
    DxRadioGroupModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxTreeViewModule,
    DxListModule,
    DxLoadPanelModule
} from 'devextreme-angular';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../shared/shared.module'

import { SiteComponent } from './site/site.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add/users-add.component';
import { AddRoleComponent } from './role/add/role-add.component';
import { UserRoleComponent } from './role/userRole/userRole.component';

@NgModule({
    imports: [
        CommonModule,
        SettingRoutingModule,
        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxTextAreaModule,
        DxTextBoxModule,
        DxFormModule,
        TabsModule,
        TranslateModule,
        DxTabPanelModule,
        DxTemplateModule,
        SharedModule,
        DxLookupModule,
        DxDateBoxModule,
        DxAccordionModule,
        /* auto complete*/
        DxAutocompleteModule,
        DxPivotGridModule,
        DxChartModule,
        DxMapModule,
        DxTreeListModule,
        DxFileUploaderModule,
        DxLoadIndicatorModule,
        DxRadioGroupModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxTreeViewModule,
        DxListModule,
        DxLoadPanelModule
    ],
    declarations: [
        SiteComponent,
        ScheduleComponent,
        RoleComponent,
        UsersComponent,
        AddRoleComponent,
        AddUsersComponent,
        UserRoleComponent
    ],
    exports: [
        DxButtonModule,
        DxDataGridModule,
        DxSelectBoxModule
    ]
})
export class SettingModule {}
