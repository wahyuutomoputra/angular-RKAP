import {
  Component,
  OnInit
} from '@angular/core';
import {
  ScheduleService
} from 'app/views/setting/schedule/schedule.service';
import {
  Schedule
} from 'app/views/setting/schedule/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService]
})
export class ScheduleComponent implements OnInit {
  schedulelist: any[];
  target: any;
  menuVisible = false;
  constructor(service: ScheduleService) {
    service.getAll()
      .subscribe(
        resp => {
          this.schedulelist = resp;
          this.schedulelist.forEach(function (value, index, array) {
            if (value.loadprofile == "Y") {
              array[index].loadprofile = true;
            } else {
              array[index].loadprofile = false;
            }
            if (value.billing == "Y") {
              array[index].billing = true;
            } else {
              array[index].billing = false;
            }
            if (value.instant == "Y") {
              array[index].instant = true;
            } else {
              array[index].instant = false;
            }
            if (value.event == "Y") {
              array[index].event = true;
            } else {
              array[index].event = false;
            }
          });
        }, err => {

        }
      );
  }

  ngOnInit() {}

  RowUpdated(e) {
    console.log('rowUpdated: ', e);
    console.log(e.key);
  }
  onContentReady(e) {
    e.component.columnOption("command:edit", {
      visibleIndex: -1,
      width: 80
    });
  }

  onCellPrepared(e) {
    if(e.column.command == 'edit' && e.rowType == 'header'){
      e.cellElement.innerText = "Action";
      e.cellElement.style = "text-align:center";
      // console.log(e.cellElement)
    }
    if (e.rowType === "data" && e.column.command === "edit") {
      var isEditing = e.row.isEditing,
        cellElement = e.cellElement;

      if (isEditing) {
        let saveLink = cellElement.querySelector(".dx-link-save"),
          cancelLink = cellElement.querySelector(".dx-link-cancel");

        saveLink.classList.add("dx-icon-save");
        cancelLink.classList.add("dx-icon-revert");

        saveLink.textContent = "";
        cancelLink.textContent = "";
      } else {
        let editLink = cellElement.querySelector(".dx-link-edit");

        editLink.classList.add("dx-icon-edit");

        editLink.textContent = "";
      }
    }
  }
}
