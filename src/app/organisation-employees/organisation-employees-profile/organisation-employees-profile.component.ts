import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-organisation-employees-profile',
  templateUrl: './organisation-employees-profile.component.html',
  styleUrls: ['./organisation-employees-profile.component.css']
})
export class OrganisationEmployeesProfileComponent implements OnInit {

  usereditform: FormGroup; temp: any

  data: any;
  profile: FormGroup;
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {
    if (sessionStorage.getItem("adminedit") == "true") {
      this.switchedit()
      sessionStorage.removeItem("adminedit")
    }
    else {
      this.edit = false
    }
    this.usereditform = new FormGroup({
      firstname: new FormControl("", Validators.required),
      middlename: new FormControl(""),
      lastname: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      designation: new FormControl("", Validators.required),
    });
    this.profile = new FormGroup({
      profilepic: new FormControl(""),
    });
    this.commonservice.postrequest('/facultydetails/findoneAdmin',
      { organisation_id: sessionStorage.getItem("organisation_id"), mail: sessionStorage.getItem('mail') }).subscribe(
        (res: any) => {
          
          this.data = res.admindata;
          this.data.profilepic == '' || this.data.profilepic == null ? this.data.profilepic = "assets/user.png" : null;
          this.image = this.data.profilepic
         
          this.temp = res.admindata;
       
          this.usereditform.controls.firstname.setValue(this.temp.firstname);
          this.usereditform.controls.middlename.setValue(this.temp.middlename);
          this.usereditform.controls.lastname.setValue(this.temp.lastname);
          this.usereditform.controls.contact.setValue(this.temp.contact);
          this.usereditform.controls.designation.setValue(this.temp.designation);
        },
        (err: any) => console.log(err)
      );

  }
  image1(arg0: string, image: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }

  image = "assets/user.png";
  tempimg = "assets/user.png";

  handleFileSelect(evt: any) {
    var reader: any = ""
    reader = new FileReader;
   
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = (event: any) => {
      this.tempimg = event.target.result;
    }
    evt.target.value = "";
  }

  saveimg: any = "save"; popup: any = ""; imagemodal = "none"
  remove() {
    this.tempimg = "assets/user.png"
  }

  saveimage() {
    this.image = this.tempimg
    this.saveimg = "saving..."
    this.data.profilepic = this.image;
    this.data.organisation_id = sessionStorage.getItem("organisation_id")
   
    this.commonservice.postrequest('/facultydetails/updateAdmin',
      this.data).subscribe(
        (res: any) => {
          this.imagemodal = "none"
          this.saveimg = "save"
          this.display = true
          this.popup = "SUCCESSFULLY SAVED"
          setTimeout(() => {
            this.display = false;
            sessionStorage.removeItem("successpopup")
          }, 5000)
        })
  }


  savestatus: any = "SAVE"; display = false; saveit = false;
  save() {
    if (this.saveit) {
      this.data.firstname = this.usereditform.controls.firstname.value
      this.data.middlename = this.usereditform.controls.middlename.value
      this.data.lastname = this.usereditform.controls.lastname.value
      this.data.contact = this.usereditform.controls.contact.value
      this.data.designation = this.usereditform.controls.designation.value
      this.savestatus = "saving..."
      this.usereditform.value.mail = sessionStorage.getItem('mail');
      this.usereditform.value.organisation_id = sessionStorage.getItem("organisation_id")
    
      this.commonservice.postrequest('/facultydetails/updateAdmin', this.usereditform.value).subscribe(
        (res: any) => {
          if (res.msg == "success") {
            this.saveit = false
            sessionStorage.removeItem("adminedit")

            this.display = true
            this.popup = "SUCCESSFULLY SAVED"
            setTimeout(() => {
              this.display = false;
            }, 5000)
            this.edit = false
           
            this.savestatus = "success"
          }
        },
        (err: any) => console.log(err)
      )
    }
    else {
      this.display = true
      this.popup = "ENTER VALID CHANGES TO SAVE"
      setTimeout(() => {
        this.display = false;
      }, 5000)

    }

  }

  close() {
    this.edit = false
    sessionStorage.removeItem("adminedit")
  }

  edit: any = false
  switchedit() {
    this.savestatus = "SAVE"
    this.edit = true
  }
}
