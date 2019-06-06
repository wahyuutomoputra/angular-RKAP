import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-form-confirmation',
  templateUrl: './_formConfirmation.html'
})
export class FormConfirmationComponent {
  @Input('text') text: String;
  @Input() confVisible;
  @Input() isDisconnect;
  @Input() isReconnect;
  @Input() isSave;
  @Input() isCancel;
  @Input() isDelete;
  @Input() isActive;
  @Input() isDeactive;

  @Output() onHideConf = new EventEmitter();
  @Output() onSaveConf = new EventEmitter();
  @Output() onCancelConf = new EventEmitter();
  @Output() onDeleteConf = new EventEmitter();
  @Output() onActiveConf = new EventEmitter();
  @Output() onDeactiveConf = new EventEmitter();

  hide() {
    this.onHideConf.emit();
  }

  yes() {
    this.hide();
    if (this.isDisconnect) {
      this.onSaveConf.emit();
    }
    if (this.isReconnect) {
      this.onSaveConf.emit();
    }
    if (this.isSave) {
      this.onSaveConf.emit();
    }
    if (this.isCancel) {
      this.onCancelConf.emit();
    }
    if (this.isDelete) {
      this.onDeleteConf.emit();
    }
    if (this.isActive) {
      this.onActiveConf.emit();
    }
    if (this.isDeactive) {
      this.onDeactiveConf.emit();
    }
  }

  no() {
    this.hide();

  }
}
