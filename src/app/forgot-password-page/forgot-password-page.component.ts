import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiCallService } from '../services/common-api-call.service';
@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  password = ''; confirm = ''; vepa1: any = false; vepa2: any = false;
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {
    if (sessionStorage.getItem('mail') === null) {
      this.router.navigate(['/login'])
    }
  }
  ngOnInit(): void {
  }

  onsubmit(f: NgForm) {
    this.commonservice.postrequest('/changepassword', { organisation_id: sessionStorage.getItem("organisation_id"), 'mail': sessionStorage.getItem('mail')?.toLocaleLowerCase(), 'password': f.value.password }).subscribe(
      (res: any) => { if (res.message == 'success') { this.router.navigate(['/login']) } },
      (err: any) => console.log(err)
    )
  }
}