import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admin-student-backlog',
  templateUrl: './admin-student-backlog.component.html',
  styleUrls: ['./admin-student-backlog.component.css']
})
export class AdminStudentBacklogComponent implements OnInit {

  constructor(private http: HttpClient, public ete: ExportExcelService, private commonservice: CommonService) { }

  ngOnInit(): void {
  }

  errorMsg = ''
  saveMode = false
  data = [];
  mapping: any = [];
  keys: any;
  objkey: any = [];
  savingMode = 'Save'
  validata: any = false
  display = false
  onfilesubmit(evt: any) {
    if (evt.target.accept !== ".xlsx") throw Error("file must be excel sheet");
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(evt.target.files[0]);

    reader.onload = (x: any) => {
      const bstr: string = x.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log((XLSX.utils.sheet_to_json(ws, { header: 1 })))
      this.keys = this.data.shift();
      if (this.keys.length !== 3) { alert("invalid format"); window.location.reload() }
      this.keys[0] = 'rollnumber'
      let data1: any = [];
      this.data.forEach((a: any) => {
        // console.log("a", a)
        if (a.length != 0) {
          data1.push(a)
        }
      })
      this.data = data1
      this.mapping = this.data.map((e) => {
        let obj: any = {};
        this.keys.forEach((key: any, i: any) => {
          this.keys[0] = 'rollnumber'
          this.keys[1] = 'ongoingbacklogs'
          this.keys[2] = 'totalbacklogs'
          obj[key] = e[i];
        });
    
        return obj;
      });
     
      this.keys.forEach((value: any, key: any) => {
        this.objkey[key] = value
      });
      this.saveMode = true
    };
  }

  save() {

    this.validata = true

  }

  savefinal() {
    this.savingMode = 'Saving'
    this.mapping.forEach((element: any) => {
      element.rollnumber = element.rollnumber.toLowerCase()
    });
    this.commonservice.postrequest('/Studentdata/updatebacklogs', { organisation_id: sessionStorage.getItem("organisation_id"), data: this.mapping }).subscribe(
      (res: any) => { this.savingMode = 'Saved'; this.mapping = []; this.saveMode = false; this.keys = []; this.display = true; setTimeout(() => { this.display = false }, 5000) },
      (err: any) => console.log(err)
    );
  }

  exportexcel(): void {
    const fileName = `sample template to upload students list.xlsx`;
    /* table id is passed over here */
    let element = document.getElementById('excel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  
}



