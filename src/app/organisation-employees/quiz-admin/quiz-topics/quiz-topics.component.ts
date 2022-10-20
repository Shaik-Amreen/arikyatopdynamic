import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-quiz-topics',
  templateUrl: './quiz-topics.component.html',
  styleUrls: ['./quiz-topics.component.css']
})
export class QuizTopicsComponent implements OnInit {

  compare: any = { organisation_id: sessionStorage.getItem("organisation_id"), type: 'quiz' }
  nodata: any = false; display = false
  quiztopics: any = []; len2: any; type1: any = ''
  constructor(private commonservice: CommonService, private router: Router) {
    if (sessionStorage.getItem('role') == 'technicaltrainer') {
      this.compare.createdby = sessionStorage.getItem('mail')
    }
    if (sessionStorage.getItem("successpopup")) {
      this.display = true
      setTimeout(() => {
        this.display = false;
        sessionStorage.removeItem("successpopup")
      }, 5000)
    }
    this.commonservice.postrequest('/Practice/gettopics', this.compare).subscribe(
      (res: any) => {
     
        this.quiztopics = res.data; this.len2 = res.length;
         this.quiztopics.reverse(); this.nodata = true
      })
  }
  ngOnInit(): void {
  }

  quiz(c: any) {
    this.router.navigate(['/admin/quiz/topics/details']);
    sessionStorage.setItem('topic', c.topic)
  }

  getquiztopics() {
    let tempquiz = this.quiztopics
    if (this.type1 != '') {
      tempquiz = this.quiztopics.filter((c: any) => (c.topic.toUpperCase().includes(this.type1.toUpperCase())))
    }
    return tempquiz
  }
}
