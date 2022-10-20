import { Component, OnInit } from '@angular/core';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-students-offer-status',
  templateUrl: './students-offer-status.component.html',
  styleUrls: ['./students-offer-status.component.css']
})
export class StudentsOfferStatusComponent implements OnInit {

  offerdata: any = {}
  placementdata: any = []
  placementcycle: any = ""
  dataForExcel: any = []
  showDownload = false
  constructor(private commonservice: CommonService, public ete: ExportExcelService) {
    this.commonservice.postrequest('/Placement/findPlacement', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (resp: any) => {
        this.placementdata = resp
      },
      (errs: any) => console.log(errs))

  }
  fetch() {
    this.showDownload = false

    this.commonservice.postrequest('/placementstatus/singlemultipleoffers', { organisation_id: sessionStorage.getItem('organisation_id'), placementcyclename: this.placementcycle }).subscribe(
      (res: any) => {
        this.offerdata = res
        this.showDownload = true
      },
      (err: any) => console.log(err)
    )
  }
  ngOnInit(): void {
  }

  exportExcel(e: any) {
    if (e == 'single') {
      this.dataForExcel = this.offerdata.singleoffer
    }
    else {
      this.dataForExcel = this.offerdata.multipleoffer
    }
    let reportData = {
      title: this.placementcycle.toUpperCase() + e + 'offers',
      data: this.dataForExcel,
      headers: [
        'Full Name',
        "Roll number",
        "Mail ID",
        "Course",
        "Department",
        "Mobile",
        "Offers"
      ],
      backAlpha: 'N3'
    }

    this.ete.exportExcel(reportData);
  }


}

