import { Component, Input,
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './_confirmation.html'
})
export class ConfirmationComponent {
  @Input('text') text: String;
  @Input() detail;
  @Input() confVisible;

  @Output() onHideConf = new EventEmitter();

  hide() {
    this.onHideConf.emit();
  }
}
