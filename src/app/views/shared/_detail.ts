import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './_detail.html'
})
export class DetailComponent {
  @Input() detail;
  @Input() popupVisible;
  @Output() onHidePopup = new EventEmitter();

  hide() {
    this.onHidePopup.emit();
  }
}
