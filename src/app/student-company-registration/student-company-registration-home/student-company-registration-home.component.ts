import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-student-company-registration-home',
  templateUrl: './student-company-registration-home.component.html',
  styleUrls: ['./student-company-registration-home.component.css']
})
export class StudentCompanyRegistrationHomeComponent implements OnInit {

  data: any; realplacement: any = ''; realcompanyname: any = ''
  registered = 'no'; wait: any = false
  constructor(private http: HttpClient, private commonservice: CommonService, private router: Router) {
   
    this.commonservice.postrequest('/company/findcompanytoregister', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: sessionStorage.getItem("placementcyclename"), companycode: sessionStorage.getItem('companyname') }).subscribe(
      (res: any) => {

        this.realplacement = res.companydetails.placementcyclename;
        this.realcompanyname = res.companydetails.companyname
        

        this.commonservice.postrequest('/placementstatus/checkregistered', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: this.realplacement, companyname: this.realcompanyname, mail: sessionStorage.getItem('mail') }).subscribe(
          (rese: any) => {
          
            res.companydetails.deadline = new Date(res.companydetails.deadline); this.data = res.companydetails;
            this.wait = true
            if (new Date(res.companydetails.deadline) < new Date()) { this.registered = 'deadline' }
            else if (rese.message == 'success') { this.registered = 'yes' }
          },
          (err: any) => console.log(err)

        );
      },
      (err: any) => console.log(err)
    );

  }


  register() {
    if (new Date(this.data.deadline) >= new Date()) {
      this.commonservice.postrequest('/placementstatus/updateregisteredcompany', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: this.realplacement, companyname: this.realcompanyname, mail: sessionStorage.getItem('mail') }).subscribe(
        (res: any) => {
          if (res.message == 'success') { this.registered = 'yes'; sessionStorage.clear(); }
        },
        (err: any) => console.log(err)
      );
    }
    else {
      window.location.reload()
    }
  }

  ngOnInit(): void {
  }

}

