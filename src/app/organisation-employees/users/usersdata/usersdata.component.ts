import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-usersdata',
  templateUrl: './usersdata.component.html',
  styleUrls: ['./usersdata.component.css']
})
export class UsersdataComponent implements OnInit {
  codeaccess = false; quizaccess = false; type: any = '';
  facdata: any[] = []; mail: any = sessionStorage.getItem('mail')
  userSignUpForm: FormGroup ; edit = false;
  selectedMode = false; selectedUser: any = { mail: '', designation: '', role: '', placementcyclename: '' }
  nodata = false
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {
    this.commonservice.postrequest('/facultydetails/finddata', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => { this.facdata = res; this.nodata = true },
      (err: any) => console.log(err)
    );
  

  }


  ngOnInit(): void {

  }

  save() {
    this.commonservice.postrequest('/updateuser', this.userSignUpForm.value).subscribe(
      (res: any) => { alert('SUCCESSFULLY SAVED'); window.location.reload() },
      (err: any) => console.log(err)
    );

  }




  access() {
    this.commonservice.postrequest('/updateuser', { quizaccess: this.quizaccess, codeaccess: this.codeaccess, ...this.userSignUpForm.value }).subscribe(
      (res: any) => {
     
      },
      (err: any) => console.log(err)
    )
  }

  deleteuser() {
    this.userSignUpForm.value.status = 'no'
    this.commonservice.postrequest('/updateuser', this.userSignUpForm.value).subscribe(
      (res: any) => {
      
      },
      (err: any) => console.log(err)
    )
  }





  adduserenable() {
    this.router.navigate(['/arikya/users/createusers'])
  }

  selectUser(i: number) {
    this.edit = false
    this.selectedUser = this.facdata[i];
    this.userSignUpForm = new FormGroup({
      'organisation_id': new FormControl(sessionStorage.getItem('organisation_id')),
      'mail': new FormControl(this.selectedUser.mail, Validators.required),
      'designation': new FormControl(this.selectedUser.designation, Validators.required),
      'role': new FormControl(this.selectedUser.role, Validators.required),
      'firstname': new FormControl(this.selectedUser.firstname, Validators.required),
      'middlename': new FormControl(this.selectedUser.middlename, Validators.required),
      'lastname': new FormControl(this.selectedUser.lastname, Validators.required),
      'status': new FormControl('yes'),
    })

    this.codeaccess = this.selectedUser.codeaccess == "true"
    this.quizaccess = this.selectedUser.quizaccess == "true"
    // console.log(" this.codeaccess,this.quizaccess ,", this.codeaccess,typeof(this.quizaccess) )

    this.selectedMode = true
  }
}
