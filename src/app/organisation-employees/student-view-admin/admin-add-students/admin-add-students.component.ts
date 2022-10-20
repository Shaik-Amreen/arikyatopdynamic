import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admin-add-students',
  templateUrl: './admin-add-students.component.html',
  styleUrls: ['./admin-add-students.component.css']
})
export class AdminAddStudentsComponent implements OnInit {

  constructor(private http: HttpClient, public ete: ExportExcelService, private commonservice: CommonService) {
  }

  ngOnInit(): void {
  }

  @ViewChild('excel')
  myInputVariable: ElementRef;

  reset() { this.myInputVariable.nativeElement.value = ""; }

  saveMode = false
  data = [];
  mapping: any = [];
  keys: any;
  objkey: any = [];
  savingMode = 'Save'
  year = ''
  errorMsg = ''
  validata: any = false

  onfilesubmit(evt: any) {
  
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(evt.target.files[0]);
    reader.onload = (x: any) => {
      const bstr: string = x.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.keys = this.data.shift();
      if (this.keys.length !== 2) { alert("invalid format"); window.location.reload() }
   
      let data1: any = [];
      this.data.forEach((a: any) => {
       
        if (a.length != 0) {
          data1.push(a)
        }
      })
      this.data = data1
     
      this.mapping = this.data.map((e: any) => {
        if (e.length != 0) {
          let obj: any = {};
          this.keys[0] = 'rollnumber'
          this.keys[1] = 'mail';
          this.keys.forEach((key: any, i: any) => {
            let a = (e[i] + '').trim()
            if (a.length != 0 && e[i]) {
        
              obj[key] = e[i];
            }
          });
          return obj;
        }
      });
    
      this.keys.forEach((value: any, key: any) => {
        this.objkey[key] = value.replace(/ /g, ' ')
      });
      this.saveMode = true;
 
      for (let c of this.mapping) {

        c.createdby = sessionStorage.getItem("mail")
        c.password = ''
        c.role = 'student'
        c.status = "yes"
        c.code = ""
        c.organisation_id = sessionStorage.getItem("organisation_id")
        c.rollnumber = (c.rollnumber + "").toLowerCase()
        c.firstname = '';
        c.course = '';
        c.department = '';
        c.currentyear = '';
        c.dob = '';
        c.yearofjoining = '';
        c.gender = '';
        c.permanentaddress = '';
        c.currentaddress = '';
        c.aadharno = '';
        c.aadhar = ''
        c.panno = '';
        c.caste = '';
        c.rank = '';
        c.altmail = '';
        c.fathername = '';
        c.religion = '';
        c.admissionquota = '';
        c.havinglaptop = '';
        c.mothername = '';
        c.tenthschoolname = ''
        c.tenthcgpa = ''
        c.interclgname = ''
        c.intercgpa = ''
        c.cgpa = '',
          c.sgpa = []
        c.totalbacklogs = ''
        c.ongoingbacklogs = ''
        c.educationgap = ''
        c.resume = ''
        c.pan = ''
        c.tenthmarksheet = ''
        c.intermarksheet = ''
        c.graduationmarksheet = ''
        c.companyexperience = ''
        c.verified = ''
        c.freeze = 'no';
        c.mobile = '',
          c.tenyear = ''
        c.interyear = '',
          c.intermpc = ''
      }

    }
    evt.target.value = ''
  }

  display = false;
  save() {
    if (this.year !== '') {
      this.validata = true
    }
    else {
      this.errorMsg = 'Please select Course'
      this.validata = false
    }
  }
  savefinal() {
    let course = this.year.split(' ');
    for (let c of this.mapping) { c.course = course[0]; c.currentyear = course[1] }
    this.savingMode = 'Saving';
    
    this.commonservice.postrequest('/Studentdata/createStudentdata',
      this.mapping).subscribe(
        (res: any) => {
         
          this.mapping = []
          console.log("resssssssssss", res);
          this.mapping = []; this.saveMode = false; this.keys = [];
          this.display = true;
          setTimeout(() => { this.display = false }, 5000)
          this.year = '';
          this.data = [];
          this.objkey = [];
          this.validata = false
          this.savingMode = 'Save';
          this.reset();
        },
        (err: any) => console.log(err)
      );
  }

  exportexcel(t: any): void {
    const fileName = `sample template to upload students list.xlsx`;
    let element = document.getElementById('excel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);

  }

  

}
