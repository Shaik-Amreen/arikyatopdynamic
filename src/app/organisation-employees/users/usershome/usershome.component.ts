import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-usershome',
  templateUrl: './usershome.component.html',
  styleUrls: ['./usershome.component.css']
})
export class UsershomeComponent implements OnInit {

  formvalue = false;
  formgroupdata: FormGroup


  formdata: any[] =
    [
      { "label": "Email address", "formname": "mail", "value": "", "valid": true, "tags": "input", "type": "email", "placeholder": "Enter new user mail", "icon": 'bx bxs-envelope', 'pattern': "^[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})+$", "patternerror": "invalid mail" },
      { "label": "Role", "formname": "role", "value": '', "valid": true, "tags": "select", "options": [{ "label": "Admin", "value": "admin" }, { "label": "Faculty", "value": "faculty" }, { "label": "Student", "value": "student" }, { "label": "Technical trainer", "value": "technicaltrainer" }] }
      , { "formname": "organisation_id", value: sessionStorage.getItem('organisation_id') },
      { "formname": "password", value: "" },
      { "formname": "createdby", value: sessionStorage.getItem('mail') },
      { "formname": "status", value: "true" }
    ]


  constructor(private commonservice: CommonService, private router: Router) {
    let form: any = {}
    this.formdata.forEach((e: any) => {
      (e.valid) ? form[e.formname] = new FormControl(e.value, [Validators.required, Validators.pattern(e.pattern)]) :
        form[e.formname] = new FormControl(e.value)
      this.formgroupdata = new FormGroup(form)
    })
  }

  add() {
    this.formvalue = true;
    this.formgroupdata.value.organisation_id = sessionStorage.getItem('organisation_id');
    // console.log(this.formgroupdata)
    this.commonservice.postrequest('/data/postcollegeaccess', this.formgroupdata.value).subscribe(
      (res: any) => {
        this.formgroupdata.reset();
        this.router.navigate(['/admin/users'])
      },
      (err: any) => console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
