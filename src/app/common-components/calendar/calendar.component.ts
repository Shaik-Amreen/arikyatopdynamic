import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule'
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  eventData: any[] = [0]; a: any = { Subject: '', StartTime: new Date(), EndTime: new Date() }
  compare: any = { organisation_id: sessionStorage.getItem('organisation_id') }
  constructor(private http: HttpClient, private commonservice: CommonService, private router: Router) {
    if (sessionStorage.getItem('role') == 'technicaltrainer') {
      this.compare.role = 'technicaltrainer'
      this.compare.createdby = sessionStorage.getItem('mail')
    }
    this.commonservice.postrequest('/company/findcalcompany', this.compare).subscribe(
      (res: any) => {
        this.eventData = res;
      },
      (err: any) => console.log(err)
    );
  }
  public setView: View = "Month"
  public setDate: Date = new Date()
  public eventObject: EventSettingsModel = {
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  }
  ngOnInit() {
    setTimeout(() => {
      this.eventObject = {
        dataSource: this.eventData
      };
    }, 1000);
  }
}
