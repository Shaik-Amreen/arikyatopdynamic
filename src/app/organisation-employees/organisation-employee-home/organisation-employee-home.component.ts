import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-organisation-employee-home',
  templateUrl: './organisation-employee-home.component.html',
  styleUrls: ['./organisation-employee-home.component.css']
})
export class OrganisationEmployeeHomeComponent implements OnInit {

  data: any = [0]; placementdata: any; presentcycle: any = "add"; studentstatus: any = [0]
  category: any = ''; content: any = ''; display = false; popup = ""
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService, public ete: ExportExcelService) {
    if (sessionStorage.getItem("adminchangepassword")) {
      this.display = true
      this.popup = "SUCCESSFULLY SAVED"
      setTimeout(() => {
        this.display = false;
        sessionStorage.removeItem("successpopup")
      }, 5000)
    }
    this.commonservice.postrequest('/company/findallcompany', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.length != 0) {
          this.data = res; this.data.reverse();
          if (this.data.length > 6) { this.data = this.data.filter((e: any, i: any) => i < 6) }
        }
        else {
          this.data = []
        }
        this.commonservice.postrequest('/Placement/findPlacement', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
          (resp: any) => {
            this.commonservice.postrequest('/Studentdata/pendinginvitations', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
              (resc: any) => {
                // console.log(resp, ";;;;;;;;;;;;;;;;;;;;;;;;");
                resp = resp.filter((e: any) => new Date(e.todate) > new Date())
                this.placementdata = resp; this.placementdata.reverse()
                this.studentstatus = resc
                // console.log(resc)
              },
              (errc: any) => console.log(errc)
            );
          },
          (errp: any) => console.log(errp)
        );
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {
  }
  comdetails(c: any) {
    sessionStorage.setItem("placementcyclename", c.placementcyclename)
    sessionStorage.setItem('companyname', c.companyname);
    this.router.navigate(["/admin/placements/companydetails"])
  }

  gotocom() {
    if (this.presentcycle != "add") {
      sessionStorage.setItem("placementcyclename", this.presentcycle)
      this.router.navigate(["/admin/placements/addeditcompany"])

    }
  }
  buttonStatus: any = 'SEND'

  sendmail() {

    this.buttonStatus = 'SENDING'
    let mails: any = []
    this.studentstatus[this.category].forEach((e: any) => {
      mails.push(e.mail)
    });
    // console.log(mails)
    this.commonservice.postrequest('/placementstatus/homequery', { organisation_id: sessionStorage.getItem("organisation_id"), mails: mails, content: this.content }).subscribe(
      (resc: any) => {
        this.buttonStatus = "SEND"
        this.content = ''
        this.category = ''
      },
      (errc: any) => console.log(errc)
    );

  }
  today(e: any) {
    if (e == '') {
      return new Date()
    }
    else {
      return new Date(e)
    }
  }
  dataForExcel: any = []
  exportToExcel(e: any) {

    this.dataForExcel = []
    this.studentstatus[e].forEach((row: any) => {
      this.dataForExcel.push([row.rollnumber, row.mail, row.course, row.currentyear, (row.dob) ? 'registered' : 'notregistered'])
    })

    let reportData = {
      title: (e == 'total') ? 'STUDENTS LIST IN ARIKYA' : (e == 'registered') ? 'REGISTERED LIST IN ARIKYA' : 'NOT REGISTERED LIST IN ARIKYA',
      data: this.dataForExcel,
      headers: ['ROLL NUMBER', "MAIL", "COURSE", "YEAR", "STATUS"],
      backAlpha: 'E3'
    }

    this.ete.exportExcel(reportData);
  }

}
