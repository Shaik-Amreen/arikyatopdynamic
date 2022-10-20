import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password = ''; confirm = ''; temp: boolean = false; temp1: boolean = false; changepassword: FormGroup; formvalue = false
  display = false; popup = ''
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {
    this.changepassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]*")]),
      confirmpassword: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void { }
  onsubmit() {
    if (this.changepassword.controls["password"].value != this.changepassword.controls["confirmpassword"].value) {
     
      this.changepassword.controls["confirmpassword"].setErrors({ mustMatch: true })
   
    }
    this.formvalue = true
    if (this.changepassword.status == "VALID") {
      
      this.commonservice.postrequest('/changepassword', { organisation_id: sessionStorage.getItem("organisation_id"), 'mail': sessionStorage.getItem('mail')?.toLocaleLowerCase(), 'password': this.changepassword.value.password }).subscribe(
        (res: any) => {
          (res.message == 'success' && res.role == "admin") ?
            (sessionStorage.setItem("adminchangepassword", 'success'), this.router.navigate(['/admin/home'])) : ((res.message == 'success' && res.role == "student") ? (sessionStorage.setItem("stdchangepassword", 'success'), this.router.navigate(['/student/studenthome'])) : null)
        },
        (err: any) => console.log(err)
      )
    }
    else {
      this.popup = "INVALID INPUT";
      this.display = true;
      setTimeout(() => { this.display = false }, 4000)
    }
  }

}
