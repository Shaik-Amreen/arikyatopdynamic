import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiCallService } from '../services/common-api-call.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  temp: boolean = false; temp1: boolean = false;
  formgroupdata: FormGroup
  formdata: any[] =
    [
      { "label": "Email address", "formname": "mail", "value": "", "valid": true, "tags": "input", "type": "email", "placeholder": "Enter your mail", "icon": 'bx bxs-envelope', "icon1": "", "icon2": "" },
      { "label": "Password", "formname": "password", "value": '', "valid": true, "tags": "input", "placeholder": "Enter your password", "type": "password", "icon": "bx bxs-lock", "icon1": "bx bxs-hide", "icon2": "bx bxs-show" }
    ]
  mail = ''; otp = ''; generatedotp = ''; timeRemained = 120; invalidotp = false; mailerr = ''
  loginMode = true; logindata = false; errorMessage = ''; vepa: any = false;
  formvalue = false; signin = "Sign In"
  ngOnInit() {

  }
  constructor(private commonservice: CommonService, private router: Router) {
    sessionStorage.removeItem('mail')
    let form: any = {}

    this.formdata.forEach((e: any) => {
      (e.valid) ? form[e.formname] = new FormControl(e.value, Validators.required) :
        form[e.formname] = new FormControl(e.value)
      this.formgroupdata = new FormGroup(form)
    })

  }

  checkOtp(f: NgForm) {
    (f.value.otp == this.generatedotp) ? (this.router.navigate(['/forgotpassword']), sessionStorage.setItem('mail', this.mail)) :
      this.invalidotp = true; f.reset()
  }


  signIn() {
 
    this.formvalue = true;
    if (this.formgroupdata.status == 'VALID') {
      this.signin = "Signing... In"
      this.commonservice.postrequest('/findoneusers', this.formgroupdata.value).subscribe(
        (res1: any) => {
          console.log(res1)
          this.signin = "Sign In";
       
          (res1.status == 'error') ? this.errorMessage = res1.error :
            sessionStorage.setItem('mail', this.formgroupdata.value.mail);
          sessionStorage.setItem('token', res1.token);
         
          sessionStorage.setItem('organisation_id', res1.organisation_id);
        
          (res1.role == 'admin' || res1.role == 'technicaltrainer') ? this.router.navigate(['/admin']) : (res1.role == 'student') ? ((res1.login == '') ? this.router.navigate(['/studentform']) : this.router.navigate(['/student/studenthome'])) : (res1.role == 'faculty') ? this.router.navigate(['/faculty/home']) : null
        },
        (err: any) => console.log(err)
      )
    }
  }

  viewforgotpass: any = true
  changeMode() { this.mail = ''; this.viewforgotpass = !this.viewforgotpass }
  buttonMode = 'SEND OTP';

  forget(f: NgForm) {
    this.mailerr = ''; f.value.mail = f.value.mail.toLowerCase()
    this.buttonMode = 'SENDING'; this.invalidotp = false
  
    this.commonservice.postrequest('/findValidMail', f.value).subscribe(
      (res: any) => {
        
        if (res.message !== "success") {
          this.mailerr = res.error; this.buttonMode = 'SEND OTP'; f.reset()
        }
        else {
          sessionStorage.setItem('mail', res.organisation_id);
          this.commonservice.postrequest('/forgotpassword', { mail: f.value.mail, organisation_id: res.organisation_id }).subscribe(
            (res1: any) => {
              if (res1.otp) {
                this.buttonMode = 'SENT'; this.generatedotp = res1.otp; this.timeRemained = 120; let time = setInterval(() => { this.timeRemained-- }, 1000)
                setTimeout(() => { this.generatedotp = ''; clearInterval(time); this.buttonMode = 'RESEND OTP' }, 120000)
              }
              else if (res1.error == 'error') { this.mailerr = 'INVALID MAIL'; this.buttonMode = 'SEND OTP'; f.reset() }
              else { this.mailerr = 'POOR CONNECTION'; this.buttonMode = 'SEND OTP'; }
            },
            (err: any) => { this.mailerr = 'POOR CONNECTION'; this.buttonMode = 'SEND OTP'; })
        }
      })
  }
}


