import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-arikya-contact',
  templateUrl: './arikya-contact.component.html',
  styleUrls: ['./arikya-contact.component.css']
})
export class ArikyaContactComponent implements OnInit {

  feedback: FormGroup
  constructor(private commonservice: CommonService, private route: Router) {
    this.feedback = new FormGroup({
      'name': new FormControl('', Validators.required),
      'mail': new FormControl('', Validators.required),
      'feed': new FormControl('', Validators.required)
    })
  }
  
  errmsg = ''

  send() {
    if (this.feedback.status == 'VALID') {
      this.commonservice.postrequest('/feedback', this.feedback.value).subscribe(
        (res: any) => {
          this.route.navigate(['/arikya'])
        })
    }
    else {
      this.errmsg = 'please fill all the fields'
    }

  }

  ngOnInit(): void {
  }



}
