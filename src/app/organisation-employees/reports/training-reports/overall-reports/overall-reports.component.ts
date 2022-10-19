import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
@Component({
  selector: 'app-overall-reports',
  templateUrl: './overall-reports.component.html',
  styleUrls: ['./overall-reports.component.css']
})
export class OverallReportsComponent implements OnInit {

  nodata: any = false
  overalldata: any = []
  viewmore: any = false;
  type: any = ''
  status: any = "all"
  loadstatus: any = false
  compare: any = { organisation_id: sessionStorage.getItem('organisation_id') }
  constructor(private http: HttpClient, private commonservice: CommonService, public ete: ExportExcelService) {
    this.nodata = false
    if (sessionStorage.getItem('role') == 'technicaltrainer') {
      this.compare.createdby = sessionStorage.getItem('mail')
    }
    this.alldata()
  }

  scrolltop(){
    document.getElementById('scrtop')?.scrollIntoView({ behavior: "smooth", block: 'center' });
  }
  
  alldata() {
    this.commonservice.postrequest('/Dashboard/allcodequiztestratings', this.compare).subscribe(
      (res: any) => {
        this.overalldata = res.data;
        this.nodata = true
       
      }
    )
  }

  ngOnInit(): void {
  }

  tempdatafunc() {
    let te: any
    this.loadstatus = true
    if (this.status != 'all') {
      te = this.overalldata.filter((e: any) => (e.dept == this.status));
    }
    else { te = this.overalldata }
    if (this.type != '') { te = te.filter((d: any) => (d.rollno.includes(this.type))) }
    this.loadstatus = false
    return te
  }

  exportToExcel() {
    let dataForExcel: any = []
    this.overalldata.forEach((row: any, i: any) => {
      dataForExcel.push([
        row.rollno,
        row.firstname + row.middlename + row.lastname,
        row.course,
        row.dept,
        row.currentyear,
        row.total,
        row.count,
        i + 1,
        row.main,
      ])
    })
    let reportData = {
      title: this.status.toUpperCase() + ' CODE AND QUIZ REPORTS ',
      data: dataForExcel,
      headers: ["STUDENT_ID",
        "FULL NAME",
        "COURSE",
        "BRANCH",
        "YEAR",
        "TOTAL TESTS",
        "ATTEMPTED TESTS",
        "RANK",
        "RATING",],
      backAlpha: 'I3'
    }

    this.ete.exportExcel(reportData);
  }


}
