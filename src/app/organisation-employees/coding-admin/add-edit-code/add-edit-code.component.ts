import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-add-edit-code',
  templateUrl: './add-edit-code.component.html',
  styleUrls: ['./add-edit-code.component.css']
})
export class AddEditCodeComponent implements OnInit {

  inputvalue = false;
  practice: FormArray; ques: FormGroup; final: FormGroup; data: any; popup: any; temptestcase: FormGroup
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {

    this.practice = new FormArray([])
    this.ques = new FormGroup({
      'questionis': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'testcasesmarks': new FormArray([]),
      'testcases': new FormArray([]),
      'tempcode': new FormArray([]),
      'attemptedmails': new FormArray([])
    })
    if (sessionStorage.getItem('editcode') != 'yes') {
      this.practice.push(this.ques);
    }
    this.final = new FormGroup({
      'topic': new FormControl('', Validators.required),
      'questions': this.practice,
      'totaltime': new FormControl('', Validators.required),
      'totalmarks': new FormControl(''),
      'type': new FormControl('code'),
      'organisation_id': new FormControl(sessionStorage.getItem("organisation_id")),
      'startson': new FormControl('', Validators.required),
      'endson': new FormControl('', Validators.required)
    })
    if (sessionStorage.getItem('editcode') == 'yes') {

      this.commonservice.postrequest('/Practice/getquestions', { organisation_id: sessionStorage.getItem("organisation_id"), topic: sessionStorage.getItem('topic'), type: "code" }).subscribe(
        (res: any) => {
          this.data = res;
         
          this.final.patchValue(this.data);
          this.data.questions.forEach((e: any, i: any) => {
            (<FormArray>this.final.get('questions')).push(new FormGroup({
              'questionis': new FormControl(e[0].questionis, Validators.required),
              'image': new FormControl(e[0].image),
              'testcases': new FormArray([]),
              'tempcode': new FormControl(e[0].tempcode),
              'attemptedmails': new FormControl(e[0].attemptedmails),
              'testcasesmarks': new FormControl(e[0].testcasesmarks),
            }));
           
            (<FormArray>this.final.get('questions')).value[i]['tempcode'] = e[0].tempcode
        
            e[0].testcases.forEach((et: any, it: any) => {
              this.getestcases(i).push(new FormGroup({
                input: new FormArray([]),
                output: new FormControl(et.output)
              }))

              et.input.forEach((ep: any) => {
                this.getparameter(i, it).push(new FormGroup({
                  invalue: new FormControl(ep.invalue)
                }))
              });
            });
          });
       
        })
    }
    else {
      this.addtestcase(0);
    }
 
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

  get controls() {
    return (<FormArray>this.final.get('questions')).controls;
  }

  datekill: any = new Date().toISOString().slice(0, 16)

  remove() {
    sessionStorage.removeItem("editcode")
  }

  addquestion() {

    let index = ((<FormArray>this.final.get('questions')).length);
    (<FormArray>this.final.get('questions')).push(new FormGroup({

      'questionis': new FormControl('', Validators.required),
      'image': new FormControl(''),
     
      'testcases': new FormArray([]),
      'testcasesmarks': new FormArray([]),
      'tempcode': new FormArray([]),
      'attemptedmails': new FormArray([])
    }))
    this.addtestcase(index);
  }

  getestcases(index: any): any {
   
    return (<FormArray>this.final.get('questions')).at(index).get('testcases')
  }

  getparameter(mainindex: any, index: any): any {

    return this.getestcases(mainindex).at(index).get('input')

  }

  addtestcase(index: any) {
    this.getestcases(index).push(new FormGroup({
      input: new FormArray([]),
      output: new FormControl('', Validators.required)
    }))
    if (this.getestcases(index).value[0].input.length == 0) {
      this.addparameter(index, this.getestcases(index).length - 1, 'test')
    }

    else {
      this.getestcases(index).value[0].input.forEach((gts: any, ind: any) => {
        this.addparameter(index, this.getestcases(index).length - 1, 'test')
      })
    }
   

  }

  timerror: any = ''

  errors: any = {}


  checkerrors(e: any, condition: any) {
    if (e) {
      this.errors[condition] = true
    }
    return true
  }

  addparameter(mainindex: any, index: any, type: string) {

    if (type == "test") {
      this.getparameter(mainindex, index).push(new FormGroup({
        invalue: new FormControl('', Validators.required)
      }))
    }
    else {
      this.getestcases(mainindex).value.forEach((e: any, i: any) => {
        this.getparameter(mainindex, i).push(new FormGroup({
          invalue: new FormControl('', Validators.required)
        }))
      })
    }
  
  }

  removetestcase(mainindex: any, index: any) {
    this.getestcases(mainindex).removeAt(index)
  }

  removeparmeter(verymain: any, mainindex: any, index: any) {
    
    this.getestcases(verymain).value.forEach((gts: any, gtsi: number) => {
      this.getparameter(verymain, gtsi).removeAt(index)
    })
  }

  deletequestion(id: number) {
    (<FormArray>this.final.get('questions')).removeAt(id)
  }

  ngOnInit(): void {
  }

  close() {
    sessionStorage.removeItem('topic')
    sessionStorage.removeItem('editcode')
  }

  display = false

  onSubmit() {
    this.timerror = ''
    let startson: any = new Date(this.final.value.startson)
    let endson: any = new Date(this.final.value.endson)
    this.inputvalue = true;
    let diffInMs = Math.abs(endson - startson);
    diffInMs = diffInMs / (1000 * 60);
    if (diffInMs < this.final.value.totaltime) {
      this.timerror = 'Please extend the last date'
    }
    this.final.value.organisation_id = sessionStorage.getItem("organisation_id")
    let url = '/'
    if (sessionStorage.getItem('editcode') == 'yes') { url = '/Practice/editcodequiz' }
    else { url = '/Practice/uploadpractice' }
    let comparedate = new Date(this.datekill)
    if (comparedate > startson) { document.getElementById("startson")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (endson <= startson) { document.getElementById("endson")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (this.timerror != '') { document.getElementById("totaltime")?.scrollIntoView({ behavior: "smooth", block: 'center' }); }
    else if (this.final.status == 'VALID') {
      this.final.value.totalmarks = this.final.value.questions.length * 10;
      this.final.value.questions.forEach((e: any) => {
        e.testcases.forEach((t: any) => {
          t.output = t.output.trim()
          let tempoutput = t.output.split('\n')
          tempoutput.forEach((to: any, i: any) => {
            tempoutput[i] = tempoutput[i].trim()
          });
          t.output = tempoutput.join('\n')
          // console.log(t.output)
          t.input.forEach((it: any) => {
            it.invalue = it.invalue.trim()
          })
        });
      })

     
      this.final.value.createdby = sessionStorage.getItem("mail")
     
      this.commonservice.postrequest(url, this.final.value).subscribe(
        (res: any) => {
          console.log(res, "redddddddddddddddd")
          if (res.message == "success") {
          
            this.practice.reset(); this.ques.reset();
            this.final.reset();
            this.image = "../../../../assets/user.png";
            sessionStorage.removeItem('topic')
            sessionStorage.removeItem('editcode')
            this.router.navigate(['/admin/code/topics'])
            sessionStorage.setItem("successpopup", 'success')

          }
          else if (res.message == "Test topic name already exists") {
            this.popup = "Test topic name already exists, Please Rename Topic";
            this.display = true;
            setTimeout(() => { this.display = false }, 4000)
          }
        },
        (err: any) => { console.log(err) }
      );
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
  };
}
