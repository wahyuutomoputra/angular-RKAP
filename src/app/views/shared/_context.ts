import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-context',
  templateUrl: './_context.html'
})
export class ContextComponent {
  @Input() contextItems;
  @Input() target;
  @Input() menuVisible;
  @Output() onHideMenu = new EventEmitter();
  @Output() itemClick = new EventEmitter();

  hide() {
    this.onHideMenu.emit();
  }

  click(e) {
    this.hide();
    this.itemClick.emit(e);
  }
}
