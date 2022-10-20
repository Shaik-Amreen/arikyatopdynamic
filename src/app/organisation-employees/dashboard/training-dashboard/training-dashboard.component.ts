import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.css']
})
export class TrainingDashboardComponent implements OnInit {

  data: any = []; codedata: any = []; totaldata: any = []; viewdata: any = []; type: any = ''; dept: any = ''; lenexist: any = 0; result: any = []
  deptdata: any;
  datareq: any = false
  obj: any;
  compare: any
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService, public ete: ExportExcelService) {
   
    this.commonservice.postrequest('/Practice/dashboardswaps', "").subscribe(
      (response: any) => {
        this.compare = { organisation_id: sessionStorage.getItem('organisation_id') }
        if (sessionStorage.getItem('role') == 'technicaltrainer') {
          this.compare.createdby = sessionStorage.getItem('mail')
        }
        this.commonservice.postrequest('/Dashboard/dashboardquizdata', { ... this.compare, type: 'quiz' }).subscribe(
          (res: any) => {
            this.data = res;

          })
        this.commonservice.postrequest('/Dashboard/dashboardcodedata', { ...this.compare, type: 'code' }).subscribe(
          (resp: any) => {
          
            this.codedata = resp;
          
          })
      
        this.commonservice.postrequest('/Dashboard/totaldata', this.compare).subscribe(
          (respo: any) => {
          
            this.totaldata = respo;
           
            var keys = Object.keys(this.totaldata.data);
            keys.forEach((key) => {
              this.lenexist = this.lenexist + this.totaldata.data[key].length
            });
            this.setOptions()
          })
      })
    
  }
  ngOnInit(): void { }
  stdseachtest: any
  stdsallcodeorquiztest: any
  stdsallcodequiztest: any
  topic1: any; type1: any; obj2: any;
  obj1: any
  totallen: any;
  view(e: any, f: any) {
    (e == 'quiz') ? (this.viewdata = this.data.data[f], this.type = 'QUIZ', this.dept = f) :
      (e == 'code') ? (this.viewdata = this.codedata.data[f], this.type = 'CODE', this.dept = f) :
        (e == 'overall') ? (this.viewdata = this.totaldata.data[f], this.type = 'OVERALL', this.dept = f, this.totallen = this.viewdata
          
        ) : null
  }
 
  exportexcel(): void {
    const fileName = `${this.type} ${this.dept} Applicants List.xlsx`;

    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    XLSX.writeFile(wb, fileName);
  }
  optionsdata: any = []
  setOptions() {

    console.log(this.totaldata.message, this.codedata.message, this.data.message, "this.totaldata.message, this.codedata.message, this.data.message")
    let opt = [ this.totaldata.message, this.codedata.message,this.data.message]
    let optkey = ['OVERALL', 'CODING ', 'QUIZ']

    opt.forEach((e: any, i: any) => {
      let optvalue: any = [], optdept: any = [], optseries: any = []
      e.forEach((d: any) => {
        optvalue.push(d.rating)
        optdept.push(d.type)
      });

      this.optionsdata.push({

        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {},
        tooltip: {
        },
        dataset: {
          source: [
            ['PLACEMENTS', ...optdept],
            ['', ...optvalue],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
       
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]

        ,
        title: {
          text: optkey[i]
        },
    
      })

    })
    this.datareq = true
    
  }
}
