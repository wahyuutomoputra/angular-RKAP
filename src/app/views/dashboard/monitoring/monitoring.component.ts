import { Component, OnInit } from '@angular/core';
import { AssetStatus, Service, RegCustomer} from 'app/views/dashboard/monitoring/monitoring.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  providers: [Service]
})
export class MonitoringComponent implements OnInit {
  assetsStatus: AssetStatus[];
  regCustomers: RegCustomer[];

  billing = {success: 0, failed: 0};
  profile = {success: 0, failed: 0};
  instant = {success: 0, failed: 0};
  failedReading = {success: 0, failed: 0};

  constructor(service: Service) {
    this.assetsStatus = service.getAssetsStatus();
    this.regCustomers = service.getRegCustomers();

    this.billing.success = 75;
    this.billing.failed = 100 - this.billing.success;
    this.profile.success = 70;
    this.profile.failed = 100 - this.profile.success;
    this.instant.success = 80;
    this.instant.failed = 100 - this.instant.success;

    this.failedReading.success = (this.billing.success + this.profile.success + this.instant.success) / 300 * 100;
    this.failedReading.failed = 100 - this.failedReading.success;
  }
  ngOnInit() {
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    const arg = e.target,
      item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    if (item) {
      this.toggleVisibility(item);
    } else {
      this.toggleVisibility(e.target);
    }
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

}
