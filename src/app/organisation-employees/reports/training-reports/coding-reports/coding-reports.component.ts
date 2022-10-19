import { Component, OnInit } from '@angular/core';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-coding-reports',
  templateUrl: './coding-reports.component.html',
  styleUrls: ['./coding-reports.component.css']
})
export class CodingReportsComponent implements OnInit {

  nodata: any = false
  loadstatus: any = false
  stdseachtest: any;
  overallcodedata: any;
  topics: any;
  alldata: boolean | undefined;
  display: boolean = false;
  value: any = "";
  type: any = ''
  status: any = "all"
  heading: any = "OVERALL TOPICS";
  compare: any = { organisation_id: sessionStorage.getItem('organisation_id'), type: 'code' }
  constructor(private commonservice: CommonService, public ete: ExportExcelService) {
    this.nodata = false
    if (sessionStorage.getItem('role') == 'technicaltrainer') {
      this.compare.createdby = sessionStorage.getItem('mail')
    }
    sessionStorage.removeItem('topic');
    this.gettopics()
    this.allcodeorquiztests()
  }

  ngOnInit(): void {
  }

  topic1: any;
  visibleData: any = []

  eachtest(t: any) {
    this.loadstatus = true
    this.topic1 = t
    this.heading = t
    this.commonservice.postrequest('/Dashboard/eachtestratings', { ...this.compare, topic: this.topic1 }).subscribe(
      (res: any) => {
        this.stdseachtest = res.data
        this.visibleData = res.data
        this.display = true
        this.loadstatus = false
       
      })
  }

  allcodeorquiztests() {
    this.commonservice.postrequest('/Dashboard/alltestratings', this.compare).subscribe(
      (res: any) => {
       
        this.alldata = true
        this.overallcodedata = res.data
        this.nodata = true
        this.visibleData = res.data
     
      })
  }

  gettopics() {
    this.commonservice.postrequest('/Practice/gettopics', this.compare).subscribe(
      (res: any) => {
        this.topics = res.data;
        this.display = false
        
      }
    )
  }

  alltestsoreach(x: any) {
    if (x != '') {
      x == 'true' ? this.alldata = true : this.alldata = false;
      if (this.alldata == false) {
        this.gettopics()
      }
   
    }
  }

  scrolltop(){
    document.getElementById('scrtop')?.scrollIntoView({ behavior: "smooth", block: 'center' });
  }

  tempdatafunc(tempdata: any) {
    this.loadstatus = true
    let te: any
    if (this.status != 'all') {
      te = tempdata.filter((e: any) => (e.dept == this.status));
    }
    else { te = tempdata }
    if (this.type != '') { te = te.filter((d: any) => (d.rollno.includes(this.type))) }
    this.loadstatus = false
    return te
  }


  exportToExcel() {
    let dataForExcel: any = []
    this.visibleData.forEach((row: any, i: any) => {
      if (this.heading == "OVERALL TOPICS") {
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
      }
      else {
        dataForExcel.push([
          row.rollno,
          row.firstname + row.middlename + row.lastname,
          row.course,
          row.dept,
          row.currentyear,
          i + 1,
          row.main,
        ])
      }
    })
    let reportData = {
      title: this.status.toUpperCase() + ' CODE REPORTS ',
      data: dataForExcel,
      headers: ["STUDENT_ID",
        "FULL NAME",
        "COURSE",
        "BRANCH",
        "YEAR",
      ],
      backAlpha: 'I3'
    };

    if (this.heading == 'OVERALL TOPICS') {
      reportData.headers.push(...["TOTAL TESTS", "ATTEMPTED TESTS", "RANK", "RATING"])
    }
    else {
      reportData.headers.push(...["RANK", "RATING"])
      reportData.backAlpha = 'G3'
    }
    this.ete.exportExcel(reportData);
  }

}
