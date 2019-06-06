import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site/site.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Setting'
        },
        children: [
            {
                path: 'site_regulation',
                component: SiteComponent,
                data: {
                    title: 'Site Regulation'
                }
            },
            {
                path: 'scheduler',
                component: ScheduleComponent,
                data: {
                    title: 'Schedule Setting'
                }
            },
            {
                path: 'role',
                component: RoleComponent,
                data: {
                    title: 'Group User'
                }
            },
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    title: 'User'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
