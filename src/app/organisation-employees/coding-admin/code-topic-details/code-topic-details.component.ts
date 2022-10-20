import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-topic-details',
  templateUrl: './code-topic-details.component.html',
  styleUrls: ['./code-topic-details.component.css']
})
export class CodeTopicDetailsComponent implements OnInit {

  nodata: any = false; endson: any = ""; endedit: any = false
  ngOnInit(): void {
  }
  editcode: any = true; totalcount: any = 0
  quizdata: any = []; marks: any = 0; topic: any = sessionStorage.getItem('topic'); data: any; type = "code"
  constructor(private commonservice: CommonService, private router: Router) {
    this.getdata()
    sessionStorage.removeItem('editcode')
  }

  date: any = new Date().toISOString().slice(0, 16)



  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',

    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
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
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
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
        'toggleEditorMode',
      ]
    ]
  };


  switchedit() {
    sessionStorage.setItem('editcode', 'yes')
    this.router.navigate(['/admin/code/add'])
  }

  newdatetodatetimelocal() {
    let hours: any = (new Date()).getHours(), minutes: any = (new Date()).getMinutes();
    if (hours < 10) {
      hours = "0" + (new Date()).getHours()
    }
    if (minutes < 10) {
      minutes = "0" + (new Date()).getMinutes()
    }
    return (new Date()).toISOString().slice(0, 11) + hours + ":" + minutes
  }


  updatendate() {
    this.data.endson = this.endson
    console.log(this.newdatetodatetimelocal(), this.data.endson)
    if (this.newdatetodatetimelocal() > this.data.endson) {
      this.endson = this.newdatetodatetimelocal()
      this.data.endson = this.endson
    }
    this.commonservice.postrequest('/Practice/editcodequiz', this.data).subscribe((res: any) => {
      this.endedit = false; this.getdata()
    }, (err: any) => { console.log(err); })
  }

  getdata() {
    this.commonservice.postrequest('/Practice/getquestions', { organisation_id: sessionStorage.getItem("organisation_id"), topic: sessionStorage.getItem('topic'), type: "code" }).subscribe(
      (res: any) => {
        this.endson = res.endson
        this.data = res;
        this.editcode = true;
        this.totalcount = 0
        if (res.tempratings.length > 0) { this.totalcount = res.ratings.length; this.editcode = false }
        else if (res.endson <= this.newdatetodatetimelocal()) { this.editcode = false }
        this.nodata = true
        // console.log("this.editcode", this.editcode, "--->", this.totalcount)
      })
  }
}
