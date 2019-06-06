import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  enableProdMode
} from '@angular/core';
import {
  DevExtremeModule,
  DxScrollViewComponent,
  DxScrollViewModule
} from 'devextreme-angular';
@Component({
  selector: 'app-detailpopup',
  templateUrl: './_detail.html',
  styleUrls: ['./_detail.css']
})
export class DetailPopupInstantComponent {
  @ViewChild(DxScrollViewComponent) scrollView: DxScrollViewComponent;
  @Input() detail;
  @Input() detailMerk;
  @Input() detailInstants;
  @Input() popupVisible;
  @Output() onHidePopup = new EventEmitter();
  isLoaded = false;
  datasourcePopup: any;
  dataSource: any;
  scrollbarMode: string;
  showScrollbarModes: any[];
  detailData: any[];


  show() {
    this.showScrollbarModes = [{
      text: 'On Scroll',
      value: 'onScroll'
    }, {
      text: 'On Hover',
      value: 'onHover'
    }, {
      text: 'Always',
      value: 'always'
    }, {
      text: 'Never',
      value: 'never'
    }];

    setTimeout(() => {
      this.scrollbarMode = this.showScrollbarModes[2].value;
      // this.detailMerk = this.detailMerk[0];


      this.isLoaded = true;
    });
    if (this.popupVisible) {
      // this.detailData = this.detailMerk.content[0]; // sebelum di iden di detail instant
      this.detailData = this.detailMerk;
      console.log('this.detailData : ', this.detailData);
      this.datasourcePopup = this.detail;
      console.log('this detail : ', this.datasourcePopup);

      const InvoltageAngleA = parseFloat(this.datasourcePopup.voltageAngelL1);
      const InvoltageAngleB = parseFloat(this.datasourcePopup.voltageAngelL2);
      const InvoltageAngleC = parseFloat(this.datasourcePopup.voltageAngelL3);

      const IncurrentAngleA = parseFloat(this.datasourcePopup.currentAngelL1);
      const IncurrentAngleB = parseFloat(this.datasourcePopup.currentAngelL2);
      const IncurrentAngleC = parseFloat(this.datasourcePopup.currentAngelL3);

      const canvas: any = document.getElementById('myCanvas');
      let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      let ctx2: CanvasRenderingContext2D = canvas.getContext('2d');
      const height = ctx.canvas.height;
      const width = ctx.canvas.width;

      ctx.clearRect(0, 0, width, height);
      ctx2.clearRect(0, 0, width, height);

      let radius = ctx.canvas.height / 2;

      ctx.translate(radius, radius);
      radius = radius * 0.90;

      ctx.fillStyle = 'white';
      ctx.fillRect(-300, -300, 600, 600);
      ctx.fill();

      let grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      grad = ctx.createRadialGradient(25, 0, radius * 0.90, 0, 0, radius * 1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0, 'white');
      grad.addColorStop(0, '#333');
      ctx.strokeStyle = grad;

      ctx.lineWidth = radius * 0.02;
      ctx.stroke();
      ctx.beginPath();
      ctx.lineTo(200, 200);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx2.beginPath();
      ctx2.lineWidth = 1;
      ctx2.setLineDash([3, 4]);
      ctx2.lineTo(0, 0);
      ctx2.moveTo(160, 0);

      ctx2.lineTo(0, 0);
      ctx2.moveTo(-160, 0);

      ctx2.lineTo(0, 0);
      ctx2.moveTo(0, -160);

      ctx2.lineTo(0, 0);
      ctx2.moveTo(0, 160);

      ctx2.lineTo(0, 0);
      ctx2.moveTo(0, 160);

      ctx2.strokeStyle = '#CCCCCC';
      ctx2.stroke();

      ctx.fillStyle = '#FF0000';
      ctx.fillRect(-90, 165, 10, 10);
      ctx.fillStyle = '#000000';
      ctx.fillText('Voltage R', -70, 175);

      ctx.fillStyle = '#99FF00';
      ctx.fillRect(-5, 165, 10, 10);
      ctx.fillStyle = '#000000';
      ctx.fillText('Voltage S', 15, 175);

      ctx.fillStyle = '#5600D8';
      ctx.fillRect(80, 165, 10, 10);
      ctx.fillStyle = '#000000';
      ctx.fillText('Voltage T', 100, 175);

      let VoltageAngelL1 = 0;
      let VoltageAngelL2 = InvoltageAngleB;
      let VoltageAngelL3 = InvoltageAngleC;

      let VoltagePhaseL1 = 1 - (240 - this.datasourcePopup.voltageL1) / 240;
      let VoltagePhaseL2 = 1 - (240 - this.datasourcePopup.voltageL2) / 240;
      let VoltagePhaseL3 = 1 - (240 - this.datasourcePopup.voltageL3) / 240;

      let r = 0;
      let s = 0;
      let t = 0;

      if (this.detailMerk.brandName == 'ACTARIS' || this.detailMerk.brandName == 'ITRON') {
        console.log('== Tegangan Actaris Itron ===');
        r = (90) + (VoltageAngelL1);
        s = (r) + (VoltageAngelL2);
        t = (r) + (VoltageAngelL2 + VoltageAngelL3);
      } else if (this.detailMerk.brandName == 'WASION') {
        console.log('== Tegangan Wasion ===');
        r = (90) + VoltageAngelL1;
        s = (r) + (-1 * VoltageAngelL2);
        t = (r) + (-1 * VoltageAngelL3);
      } else if (this.detailMerk.brandName == 'HEXING') {
        console.log('== Tegangan Hexing ===');
        r = (90) + (VoltageAngelL1);
        s = (r) + (VoltageAngelL2);
        t = (r) + (VoltageAngelL3);
      } else {
        console.log('== Tegangan EDMI ===');
        r = (90) + (VoltageAngelL1);
        s = (r) + (VoltageAngelL2);
        t = (r) + (VoltageAngelL3);
      }


      r = r % 360;
      r = (r * Math.PI / 180);
      this.drawHand(ctx, r, radius * VoltagePhaseL1, radius * 0.02, ctx.strokeStyle = '#FF0000');

      s = s % 360;
      s = (s * Math.PI / -180) - (r * 2);
      this.drawHand(ctx, s, radius * VoltagePhaseL2, radius * 0.02, ctx.strokeStyle = '#99FF00');

      t = t % 360;
      t = (t * Math.PI / -180) - (r * 2);
      this.drawHand(ctx, t, radius * VoltagePhaseL3, radius * 0.02, ctx.strokeStyle = '#5600D8');

      let CurrentAnglex = 0;
      let AngleA = 0;
      let AngleB = InvoltageAngleB;
      let AngleC = InvoltageAngleC;

      let CurrentAngleL1 = parseFloat(this.datasourcePopup.currentAngelL1);
      let CurrentAngleL2 = parseFloat(this.datasourcePopup.currentAngelL2);
      let CurrentAngleL3 = parseFloat(this.datasourcePopup.currentAngelL3);

      let CurrentL1 = parseFloat(this.datasourcePopup.currentL1);
      let CurrentL2 = parseFloat(this.datasourcePopup.currentL2);
      let CurrentL3 = parseFloat(this.datasourcePopup.currentL3);

      let maxValue: any;
      if (CurrentL1 > CurrentL2 && CurrentL1 > CurrentL3) {
        maxValue = CurrentL1 * 1.5;
      } else if (CurrentL2 > CurrentL1 && CurrentL2 > CurrentL3) {
        maxValue = CurrentL2 * 1.5;
      } else {
        maxValue = CurrentL3 * 1.5;
      }

      let z = (-90) + CurrentAnglex;
      let rCurrent = 0;
      let sCurrent = 0;
      let tCurrent = 0;

      if (this.detailMerk.brandName == 'EDMI') {
        console.log('== Sudut EDMI ===');
        rCurrent = (z) + (CurrentAngleL1);
        sCurrent = (z) + (CurrentAngleL2);
        tCurrent = (z) + (CurrentAngleL3);
      } else if (this.detailMerk.brandName == 'ACTARIS' || this.detailMerk.brandName == 'ITRON') {
        console.log('== Sudut Actaris Itron ===');
        rCurrent = (z) + (AngleA + CurrentAngleL1);
        sCurrent = (z) + (AngleB + CurrentAngleL2);
        tCurrent = (z) + ((AngleC + AngleB) + CurrentAngleL3);
      } else if (this.detailMerk.brandName == 'HEXING') {
        console.log('== Sudut Hexing ===');
        rCurrent = (z) + (AngleA + CurrentAngleL1);
        sCurrent = (z) + (AngleB + CurrentAngleL2);
        tCurrent = (z) + (AngleC + CurrentAngleL3);
      } else {
        console.log('== Sudut WASION ===');
        rCurrent = (z) + (1 * (AngleA - CurrentAngleL1));
        sCurrent = (z) + (-1 * (AngleB + CurrentAngleL2));
        tCurrent = (z) + (-1 * (AngleC + CurrentAngleL3));
      }

      let modulus = radius * maxValue / radius;

      if (this.detailMerk.brandName == 'WASION' || this.detailMerk.brandName == 'ACTARIS' || this.detailMerk.brandName == 'ITRON') {
        rCurrent = rCurrent % 360;
        rCurrent = (rCurrent * Math.PI / ((-270) + (90)));
        this.drawHand(ctx, rCurrent, radius * CurrentL1 / modulus, radius * 0.02, ctx.strokeStyle = '#FF8888');

        sCurrent = sCurrent % 360;
        sCurrent = (sCurrent * Math.PI / ((-270) + (90)));
        this.drawHand(ctx, sCurrent, radius * CurrentL2 / modulus, radius * 0.02, ctx.strokeStyle = '#CCFF80');

        tCurrent = tCurrent % 360;
        tCurrent = (tCurrent * Math.PI / ((-270) + (90)));
        this.drawHand(ctx, tCurrent, radius * CurrentL3 / modulus, radius * 0.02, ctx.strokeStyle = '#AE79FF');
      } else {
        rCurrent = rCurrent % 360;
        rCurrent = (rCurrent * Math.PI / -180);
        this.drawHand(ctx, rCurrent, radius * CurrentL1 / modulus, radius * 0.02, ctx.strokeStyle = '#FF8888');

        sCurrent = sCurrent % 360;
        sCurrent = (sCurrent * Math.PI / -180);
        this.drawHand(ctx, sCurrent, radius * CurrentL2 / modulus, radius * 0.02, ctx.strokeStyle = '#CCFF80')

        tCurrent = tCurrent % 360;
        tCurrent = (tCurrent * Math.PI / -180);
        this.drawHand(ctx, tCurrent, radius * CurrentL3 / modulus, radius * 0.02, ctx.strokeStyle = '#AE79FF');
      }
    }
    this.isLoaded = true;
  }

  drawHand(ctx, pos, length, width, coloring) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = coloring;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.rotate(-pos);
    ctx.stroke();
  }

  hide() {
    this.onHidePopup.emit();
    this.popupVisible = false;
  }
}
