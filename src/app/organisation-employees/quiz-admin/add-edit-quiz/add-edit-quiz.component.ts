import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {

  inputvalue = false;
  practice: FormArray; ques: FormGroup; final: FormGroup; popup: any = 'SUCCESSFULLY SAVED'
  data: any
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {

    this.practice = new FormArray([])
    this.ques = new FormGroup({
      "questionis": new FormControl('', Validators.required),
      "image": new FormControl(''),
      "option1": new FormControl('', Validators.required),
      "option2": new FormControl('', Validators.required),
      "option3": new FormControl('', Validators.required),
      "option4": new FormControl('', Validators.required),
      "correct": new FormControl('', Validators.required),
      "explanation": new FormControl('', Validators.required)
    })
    if (sessionStorage.getItem('editquiz') != 'yes') { console.log("editquiz--->yes"); this.practice.push(this.ques); }
    this.final = new FormGroup({
      'topic': new FormControl('', Validators.required),
      "totaltime": new FormControl('', Validators.required),
      "totalmarks": new FormControl(''),
      'questions': this.practice,
      'type': new FormControl('quiz'),
      'organisation_id': new FormControl(sessionStorage.getItem("organisation_id")),
      'startson': new FormControl('', Validators.required),
      'endson': new FormControl('', Validators.required)
    })
    if (sessionStorage.getItem('editquiz') == 'yes') {
      this.commonservice.postrequest('/Practice/getquestions', { organisation_id: sessionStorage.getItem("organisation_id"), topic: sessionStorage.getItem('topic'), type: "quiz" }).subscribe(
        (res: any) => {
          this.data = res; console.log(res);
          this.final.patchValue(this.data);
          this.data.questions.forEach((e: any) => {
            (<FormArray>this.final.get('questions')).push(new FormGroup({
              "questionis": new FormControl(e[0].questionis, Validators.required),
              "image": new FormControl(e[0].image),
              "option1": new FormControl(e[0].option1, Validators.required),
              "option2": new FormControl(e[0].option2, Validators.required),
              "option3": new FormControl(e[0].option3, Validators.required),
              "option4": new FormControl(e[0].option4, Validators.required),
              "correct": new FormControl(e[0].correct, Validators.required),
              "explanation": new FormControl(e[0].explanation, Validators.required)
            }))
          });
        })
    }
  }

  get controls() {
    return (<FormArray>this.final.get('questions')).controls;
  }

  base64Output: string = '';
  savedata = false
  onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe((base64: any) => {
      this.base64Output = base64;
      this.final.controls["material"].setValue(this.base64Output)
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  image = "../../../../assets/user.png";
  handleFileSelect(evt: any) {
    var reader = new FileReader;
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = (event: any) => {
      this.image = event.target.result;
      this.ques.controls.image.setValue(this.image);
    }
    evt.target.value = "";
  }

  remove() {
    sessionStorage.removeItem("editquiz")
  }

  addquestion() {
    (<FormArray>this.final.get('questions')).push(new FormGroup({
      "questionis": new FormControl('', Validators.required),
      "image": new FormControl(''),
      "option1": new FormControl('', Validators.required),
      "option2": new FormControl('', Validators.required),
      "option3": new FormControl('', Validators.required),
      "option4": new FormControl('', Validators.required),
      "correct": new FormControl('', Validators.required),
      "explanation": new FormControl('', Validators.required)
    }))
  }


  deletequestion(id: number) {
    (<FormArray>this.final.get('questions')).removeAt(id)
  }

  close() {
    sessionStorage.removeItem('topic')
    sessionStorage.removeItem('editquiz')
  }

  ngOnInit(): void {
  }
  datekill: any = new Date().toISOString().slice(0, 16)

  display = false;
  timerror: any = ''
  onSubmit() {
    this.timerror = ''
    this.inputvalue = true;
    let startson: any = new Date(this.final.value.startson)
    let endson: any = new Date(this.final.value.endson)
    // console.log("heloo1", this.final.value.startson, startson)
    this.inputvalue = true;
    let diffInMs = Math.abs(endson - startson);
    diffInMs = diffInMs / (1000 * 60);
    // console.log(diffInMs)
    if (diffInMs < this.final.value.totaltime) {
      this.timerror = 'Please extend the last date'
    }
    let comparedate = new Date(this.datekill)
    if (comparedate > startson) { document.getElementById("startson")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (endson <= startson) { document.getElementById("endson")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (this.timerror != '') { document.getElementById("totaltime")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (this.final.status == 'VALID') {
      // this.final.value.startson = startson
      // this.final.value.endson = endson
      // console.log("heloo1")
      this.final.value.totalmarks = this.final.value.questions.length;
      this.final.value.type = 'quiz';
      this.final.value.organisation_id = sessionStorage.getItem("organisation_id")
      this.final.value.createdby = sessionStorage.getItem("mail")
      let url = '/'
      if (sessionStorage.getItem('editquiz') == 'yes') { url = '/Practice/editcodequiz' }
      else { url = '/Practice/uploadpractice' }
      // console.log('url')
      this.commonservice.postrequest(url, this.final.value).subscribe(
        (res: any) => {
          // console.log(res,"//////////////////////////")
          if (res.message == "success") {
            // this.display = true;
            // setTimeout(() => { this.display = false }, 4000)
            this.practice.reset(); this.ques.reset();
            this.final.reset();
            this.image = "../../../../assets/user.png";
            sessionStorage.removeItem('topic')
            sessionStorage.removeItem('editquiz')
            this.router.navigate(['/admin/quiz/topics'])
            sessionStorage.setItem("successpopup", 'success')
        
          }
          else if (res.message == "error") alert("error");
          else if (res.message == "Test topic name already exists") {
         
            this.popup = "Test topic name already exists, Please rename topic";
            this.display = true;
            setTimeout(() => { this.display = false }, 4000)
          }

        }
      )
    }
    else {
      const firstElementWithError = document.querySelector('.ng-invalid');
      if (firstElementWithError) {
        firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      let a = ''
      Object.keys(this.final.value).forEach(control => {
        const controlErrors = this.final.controls[control].errors;
        if (controlErrors != null && a == '') {
          a = control
   
          document.getElementById(control)?.scrollIntoView({ behavior: "smooth", block: 'center' });
        }
      });

      Object.keys(this.ques.value).forEach(control => {
        const controlErrors = this.ques.controls[control].errors;
        if (controlErrors != null && a == '') {
          a = control
     
          document.getElementById(control)?.scrollIntoView({ behavior: "smooth", block: 'center' });
        }
      });
    
      this.display = true
      this.popup = "INVALID INPUT DATA"
      setTimeout(() => { this.display = false }, 4000)
    }
  }
 

  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
    outline: false,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  config2: AngularEditorConfig = {

    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'ENTER QUESTION',
    translate: 'no',
    sanitize: true,
    outline: true,
    enableToolbar: true,
    showToolbar: true,
    toolbarPosition: 'bottom',
    defaultFontName: '',
    defaultFontSize: '',
    defaultParagraphSeparator: '',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter question here',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Comic-Sans-MS',
    defaultFontSize: '5',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

}
