import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './_progress.html'
})
export class ProgressComponent {
  @Input('progressTitle') progressTitle: String;
  @Input('progressContent') progressContent: String;
  @Input() progressVisible;
  @Output() onHideProgress = new EventEmitter();

  min: '0';
  max: '100';
  value: '50';

  hide() {
    this.onHideProgress.emit();
  }
}
