import { HttpClient } from '@angular/common/http';
import { Component,ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import * as XLSX from 'xlsx';
import { ViewChild } from '@angular/core';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-organisation-company-details',
  templateUrl: './organisation-company-details.component.html',
  styleUrls: ['./organisation-company-details.component.css']
})
export class OrganisationCompanyDetailsComponent implements OnInit {

  display = false;
  companydetails: any = {}; data = []; nowshorted: any = []; rejectedlist: any = []; nodata: any = false
  mapping: any = [];
  singlestudent: any = ''
  removestudentstatus: any = 'Remove'
  placementstatus: any = {};
  keys: any; uploadindex: any = -5
  objkey: any = [];
  applicantslist: any = []; setedit: any = {}; addstudent: any
  ch = 0; deadline = ''; errdate = ''; mailstatus = 'SEND MAIL'; eligible = 0; registered = 0; comselected = ''; addstatus = 'ADD STUDENTS'; removestatus = 'REMOVE STUDENTS'; currentIndex = -1
  eligibility: any[] = []; hiringflow: any[]
  allcom = [{ companyname: '' }]; listofstu = []; relen = 0; placed = 0; nextIndex = 0;

  lastItem: any = false
  image = "../../../../assets/companylogo.jpg";
  tempimg = "../../../../assets/companylogo.jpg";
  saveimg: any = "save"; popup: any = ""; imagemodal = "none"
  saveButton: any = "SAVE"
  saveButtonStatus: any = 'SAVE'
  dataForExcel: any = []
  single: any = 'ADD'

  constructor(private http: HttpClient, private commonservice: CommonService, private route: Router, public ete: ExportExcelService) {
    this.firstcall()
  }

  viewplacementstatus: any = 'none'
  viewhiringlevel: any = ''

  datainitialize() {
    this.display = false;
    this.companydetails = {}; this.data = []; this.nowshorted = []; this.rejectedlist = []; this.nodata = false
    this.mapping = [];
    this.singlestudent = ''
    this.uploadindex = -5
    this.objkey = [];
    this.applicantslist = []; this.setedit = {}
    this.ch = 0; this.deadline = ''; this.errdate = ''; this.mailstatus = 'SEND MAIL'; this.eligible = 0; this.registered = 0; this.comselected = ''; this.addstatus = 'ADD STUDENTS'; this.removestatus = 'REMOVE STUDENTS'; this.currentIndex = -1
    this.eligibility = []; this.hiringflow = []
    this.allcom = [{ companyname: '' }]; this.listofstu = []; this.relen = 0; this.placed = 0; this.nextIndex = 0;
    this.image = "../../../../assets/companylogo.jpg";
    this.tempimg = "../../../../assets/companylogo.jpg";
    this.saveimg = "save"; this.popup = ""; this.imagemodal = "none"
    this.saveButton = "SAVE"
    this.saveButtonStatus = 'SAVE'
    this.dataForExcel = []
    this.single = 'ADD'
    sessionStorage.removeItem('editcompany')
    this.mailstatus = 'SEND MAIL'; this.addstatus = 'ADD STUDENTS'
    this.viewplacementstatus = 'none'
    this.viewhiringlevel = ''
  }

  
  firstcall() {
    this.commonservice.postrequest('/company/findcompany', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: sessionStorage.getItem("placementcyclename"), companyname: this.companyname }).subscribe(
      (res: any) => {
        this.commonservice.postrequest('/placementstatus/eligible', res.companydetails).subscribe(
          (rese: any) => {
            this.nodata = true
            this.registered = rese.rdata.length; 
            this.eligible = rese.data.length;
            console.log(rese.data,"rese.data")
            this.eligible = rese.data.length - rese.noteligibleminus;
         
            if (new Date(res.companydetails.deadline) < new Date() && res.companydetails.deadline != 'not updated' && res.companydetails.status != 'submitted') {
              res.companydetails.status = 'closed';
              this.commonservice.postrequest('/company/updatestatus', res.companydetails).subscribe(
                (response: any) => {
                  this.companydetails = res.companydetails;
                  this.hiringflow = this.companydetails.hiringworkflow.flat();
                  this.companydetails.companylogo = (res.companydetails.companylogo);
                  (this.companydetails.companylogo == null || this.companydetails.companylogo == '') ? this.companydetails.companylogo = "../../../.././assets/companylogo.jpg" : null;
                  this.image = this.companydetails.companylogo;
                  this.getWorkflow()
                },
                (err: any) => console.log(err)
              )
            }
            else {
              this.companydetails = res.companydetails;
              this.hiringflow = this.companydetails.hiringworkflow.flat();
              (this.companydetails.companylogo == null || this.companydetails.companylogo == '') ? this.companydetails.companylogo = "../../../.././assets/companylogo.jpg" : null;
              this.image = this.companydetails.companylogo
              this.getWorkflow();
            }

          },
          (erer: any) => console.log(erer)
        )

      },
      (err: any) => console.log(err)
    );
    this.commonservice.postrequest('/company/findacompany', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: sessionStorage.getItem("placementcyclename") }).subscribe(
      (res: any) => {
        this.commonservice.postrequest('/placementstatus/applicants', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: sessionStorage.getItem("placementcyclename"), companyname: this.companyname }).subscribe(
          (rese: any) => {
            this.applicantslist = rese; this.allcom = res;
          },
          (err: any) => console.log(err)
        )
      },
      (err: any) => console.log(err)
    );

  }

  nodataupload: any = false
  companywisehiring: any = false
  comparelevel: any = ''
  uploadedlevels: any = []
  getWorkflow() {
    this.lastItem = false
    this.nodataupload = false

    this.commonservice.postrequest('/hiringstudent/findcompanywise', { organisation_id: sessionStorage.getItem("organisation_id"), placementcyclename: sessionStorage.getItem("placementcyclename"), companyname: this.companyname }).subscribe(
      (reset: any) => {
        reset = reset.reverse()
        if (reset.length == 0) {
          this.currentIndex = 0
        }
        else {

          let compareindex = 0
          this.hiringflow.map((r: any, ir: any) => {
           
            if (ir == 0) {
              this.comparelevel = r.level
              compareindex = 0
            }

            this.placementstatus[r.level] = reset.filter((e: any, i: any) => e.hiringflowname == r.level).map((obj: any) => obj.rollnumber)
            if (this.placementstatus[r.level].length != 0) {
              this.uploadedlevels.push(r.level)
              if (compareindex < ir) {
                compareindex = ir;
                this.comparelevel = r.level
              }
            }
          
          })

        
          this.nodataupload = true
          this.currentIndex = this.hiringflow.findIndex(e => e.level === this.comparelevel);
          if (this.currentIndex == this.hiringflow.length - 1) {
            this.lastItem = true
          }
          else {
            this.lastItem = false
          }

          this.nowshorted = reset.filter((e: any, i: any) => e.hiringflowname == this.comparelevel)
         
          if (compareindex != 0) {
            this.companywisehiring = reset.filter((e: any, i: any) => e.hiringflowname == this.hiringflow[compareindex - 1].level)

          }
          else {
            this.companywisehiring = []
          }
        }
      }
    )
  }


  handleFileSelect(evt: any) {
    var reader = new FileReader;
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = (event: any) => {
      this.tempimg = event.target.result;
      
    }
    evt.target.value = "";
  }


  remove() {
    this.tempimg = "../../../../assets/companylogo.jpg"
  }

  save() {
    this.image = this.tempimg
    this.saveimg = "saving..."
    this.companydetails.companylogo = (this.image);
    this.companydetails.organisation_id = sessionStorage.getItem("organisation_id")
    this.commonservice.postrequest('/company/updatecompany', this.companydetails).subscribe(
      (res: any) => {
        // console.log("res image", res)
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


  switchedit() {
    sessionStorage.setItem('editcompany', 'yes')
    this.route.navigate(["/admin/placements/addeditcompany"])
  }

  addlevel(l: any) { this.hiringflow.push({ placementcyclename: this.companydetails.placementcyclename, companyname: this.companydetails.companyname, level: l }) }

  removelevel(l: any) {
    let index = this.hiringflow.findIndex((s: any) => s.level == l.level);
    this.hiringflow.splice(index, 1)
  }

  ngOnInit(): void {

  }


  check(l: any) {
    for (let e of this.hiringflow) { if (e.level.includes(l) == true) { console.log(e.level.includes(l)); return true; break; } }
  }

  toView(l: string) {
    let element = document.getElementById(l);
    if (element != null) { element.scrollIntoView() }
  }

  close() {
    this.deadline = new Date().toString();
    this.saveline()
  }

  saveline() {
    if (this.deadline == '') { this.errdate = "Please select date" }
    else {
      this.companydetails.deadline = this.deadline;
      if (new Date(this.deadline) < new Date()) { this.companydetails.status = 'closed' }
      else { this.companydetails.status = 'opened' }
      this.commonservice.postrequest('/company/updatestatus', this.companydetails).subscribe(
        (res: any) => {
          
          this.companydetails = res.data; this.ch = 0; this.getWorkflow()
         
        },
        (err: any) => console.log(err)
      )
    }
  }



  sendmail() {
    this.mailstatus = 'SENDING MAIL';
    this.commonservice.postrequest('/placementstatus/sendmail', {...this.companydetails, mail: sessionStorage.getItem("mail")}).subscribe(
      (res: any) => {
        

        this.mailstatus = 'MAIL SENT'
      },
      (err: any) => console.log(err)
    )
  }




  onfilesubmit(evt: any, i: any, type: any) {

    this.uploadindex = i
    
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(evt.target.files[0]);

    reader.onload = (x: any) => {

      const bstr: string = x.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsplacementcyclename: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsplacementcyclename];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    
      this.keys = this.data.shift();

      if (this.keys.length > 1) { alert("invalid format"); window.location.reload() }
      this.mapping = this.data.map((e) => {
        let obj: any = {};
        this.keys.forEach((key: any, i: any) => {
          key = 'rollnumber'
          obj[key.replace(/ /g, ' ')] = e[i];
        });
        return obj;
      });
      this.keys.forEach((value: any, key: any) => {
        this.objkey[key] = value.replace(/ /g, ' ')
      });
   
      let comparearr = (type == 'edit') ? this.companywisehiring : this.nowshorted
      this.mapping = this.mapping.filter((m: any) => (this.applicantslist.some((a: any) => (a.rollnumber == m.rollnumber))))
   
      this.mapping.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.id === v.id)) === i)
      comparearr.map((e: any) => {
        let a: any = true;
        this.mapping.map((n: any) => {
          n.rollnumber == e.rollnumber ? a = false : null;
        });
        a != false ? this.rejectedlist.push(e) : null;
      });
      
      this.mapping = this.mapping.filter((s: any) => (comparearr.map((n: any) => n.rollnumber == s.rollnumber)))
    
      if (this.currentIndex == 0 || !this.nodataupload) {
    
        this.rejectedlist = this.applicantslist.filter((m: any) => (this.mapping.every((a: any) => (a.rollnumber !== m.rollnumber))))
   
      }

      for (let c of this.mapping) {
        c.rollnumber = c.rollnumber.toString().toLowerCase()
        c.placementcyclename = this.placementcyclename
        c.companyname = this.companyname
        c.hiringflowname = this.hiringflow[i].level,
          c.organisation_id = this.organisation_id
      }

    };



  }







  addstu() {
    this.companydetails.presentcompany = this.comselected;
    
    this.addstatus = 'ADDING...'
    this.commonservice.postrequest('/placementstatus/addstu', this.companydetails).subscribe(
      (res: any) => {
        this.addstatus = res.message
        console.log(res.message,"res.message add")
        this.firstcall()
      },
      (err: any) => console.log(err)
    );
  }

  removestu() {
    this.companydetails.presentcompany = this.comselected;
    this.removestatus = 'REMOVING...';
    this.commonservice.postrequest('/placementstatus/removestu', this.companydetails).subscribe(
      (res: any) => {
        this.removestatus = res.message;    
        console.log(res.message,"res.message remove ")
        this.firstcall();
      },
      (err: any) => console.log(err)
    );
  }

  showStudent: any = false

  fetchstudent() {
    this.single = 'ADD';
    this.showStudent = false
    this.commonservice.postrequest('/studentdata/findbyrollnumber', { organisation_id: sessionStorage.getItem("organisation_id"), rollnumber: this.singlestudent, ...this.companydetails }).subscribe(
      (res: any) => {
        this.addstudent = res.data;
        this.showStudent = true;
      },
      (err: any) => console.log(err)
    )
  }





  savethelist() {
  
    this.saveButton = "SAVING"
    if (this.hiringflow[this.hiringflow.length - 1].level == this.mapping[0].hiringflowname) {
      this.lastItem = true
    }
    let data = { organisation_id: sessionStorage.getItem("organisation_id"), accepted: this.mapping, rejected: this.rejectedlist, lastItem: this.lastItem }
   
    this.commonservice.postrequest('/hiringstudent/posthiringstudent', data).subscribe(
      (res: any) => { this.getWorkflow(); this.saveButton = "SAVE";this.firstcall(); this.mapping = []; this.keys = []; },
      (err: any) => console.log(err)
    )
  }


  updatethelist(level: any) {
   
    if (this.hiringflow[this.hiringflow.length - 1].level == this.mapping[0].hiringflowname) {
      this.lastItem = true
    }
    this.commonservice.postrequest('/hiringstudent/hiringupdate', { organisation_id: sessionStorage.getItem("organisation_id"), accepted: this.mapping, rejected: this.rejectedlist, lastItem: this.lastItem }).subscribe(
      (res: any) => { this.saveButton = "SAVE";this.firstcall(); this.mapping = []; this.keys = []; this.setedit = false; this.getWorkflow() },
      (err: any) => console.log(err)
    )
  }


  exportexcel() {
    this.dataForExcel = []
    this.applicantslist.forEach((row: any) => {
      this.dataForExcel.push([row.firstname, row.rollnumber, row.course, row.department, row.mobile, row.mail, row.dob, row.currentaddress, row.permanentaddress, row.semcgpa, row.tenthcgpa, row.tenthboard, row.tenthschoolname, row.tenyear, row.intermpc, row.interboard, row.interclgname, row.intercgpa, row.interyear, row.ongoingbacklogs > 0 ? 'yes' : 'no'])
    })
    let reportData = {
      title: `${this.companydetails.placementcyclename} ${this.companydetails.companyname} Applicants`,
      data: this.dataForExcel,
      headers: ['Name', "Roll Number", "COURSE", "Department", "Mobile", 'Email ID', 'DOB', 'Current Address', 'Permanent Address', 'Current Term Score', 'X percentage', 'X Board', 'X School Name', 'Year of passing 10th', 'Inter / Diploma', 'XII Board', 'XII College Name', 'XII CGPA', 'Year of passing 12th', 'Backlogs'],
      backAlpha: 'T3'
    }
    this.ete.exportExcel(reportData);
  }


  submitcompany: any = false
  otpstatus: any = ''
  otpentered: any = ''


  sendotptomail() {
    this.submitcompany = false
    this.otpstatus = ''
    this.commonservice.postrequest('/placementstatus/submitcompanystatus', { mail: sessionStorage.getItem("mail"), ... this.companydetails }).subscribe(
      (res: any) => { this.submitcompany = true },
      (err: any) => console.log(err)
    )
  }

  verifyOtp() {
    this.otpstatus = ''
    this.commonservice.postrequest('/placementstatus/verifyOtp', { ... this.companydetails, submitcodeentered: this.otpentered }).subscribe(
      (res: any) => {
        if (!res.message) { this.otpstatus = "Otp entered is incorrect" } else {
          this.companydetails.status = 'submitted'
        }
      },
      (err: any) => console.log(err)
    )
  }
  singlestudentmail() {
    this.single = 'ADDING...'
   
    this.commonservice.postrequest('/placementstatus/singlestudent', { organisation_id: sessionStorage.getItem("organisation_id"), ...this.companydetails, ...this.addstudent }).subscribe(
      (res: any) => { if (res.message == "success") { this.single = 'ADDED' ;this.firstcall() } else if (res.message == "exist") { this.single = 'ALREADY EXIST' } },
      (err: any) => console.log(err)
    )
  }

  removestudent() {
    this.removestudentstatus = 'Removing...'
    this.commonservice.postrequest('/placementstatus/updateofferletter', { organisation_id: sessionStorage.getItem("organisation_id"), ...{ registered : 'no',eligible: false, mail: this.addstudent.mail, placementcyclename: this.companydetails.placementcyclename, companyname: this.companydetails.companyname } }).subscribe(
      (res: any) => { this.removestudentstatus = 'Removed';this.firstcall() },
      (err: any) => console.log(err)
    )

  }

  addapplicantdisplay = 'none'
  applicants: any
  validate = false;
  validatemsg = ""
  addapplicants = 'ADD'
  applicantstatus = '';
  studentlevel = ''
  entryupload = true;
  hierarchylevel = "";


  addapplicantmodal() {
  
    this.addapplicantdisplay = 'block'; this.validatemsg = ''; this.applicants = ''; this.applicantstatus = 'Add'; this.studentlevel = "Applicants"; this.addapplicants = "ADD";
    if (this.updateeligibility) { this.studentlevel = "Eligibilities" }
    if (this.hierarchylevel) { this.studentlevel = "Students to " + this.hierarchylevel }
  }

  removeapplicantmodal() {
    this.addapplicantdisplay = 'block'; this.applicantstatus = 'Remove'; this.validatemsg = ''; this.applicants = ''; this.studentlevel = "Applicants"; this.addapplicants = "REMOVE";
    if (this.updateeligibility) { this.studentlevel = "Eligibilities"; this.updateeligibility = false }
    if (this.hierarchylevel) { this.studentlevel = "Students to " + this.hierarchylevel }
  }

  rollnos: any;

  addapplicant() {
    if (this.entryupload) {
      this.validate = true
      this.validatemsg = ""
      if (this.applicants) {
        this.rollnos = this.applicants.toLowerCase().trim().replace(/\n/g, ',').replace(/ /g, "").split(',');
        this.rollnos.forEach((data: any, index: any) => {
          if ((data.length != 10 || !/^[A-Za-z0-9]*$/.test(data)) && !this.validatemsg) {
            this.validatemsg = `*Invalid Input ${data} at Line No ${index + 1}`
            if (this.rollnos.length == index + 1) {
              this.validatemsg = `*Invalid Input ${data} At End`
            }
          }
        });
        if (!this.validatemsg) {
          if (this.hierarchylevel) {
            if (this.applicantstatus == 'Add') { this.addIntoLevel(this.hierarchylevel) }
            else { this.removeIntoLevel(this.hierarchylevel) }
          }
          else { this.updateapplicants(); }
        }
      }
      else {
        this.validatemsg = "*Required"
      }
    }
    else if (this.rollnos.length != 0) {
      if (this.hierarchylevel) {
        if (this.applicantstatus == 'Add') { this.addIntoLevel(this.hierarchylevel) }
        else { this.removeIntoLevel(this.hierarchylevel) }
      }
      else { this.updateapplicants(); }
      this.rollnos = []
      this.mapping = []
      this.mapping = []; this.saveMode = false; this.keys = [];
      this.data = [];
      this.objkey = [];
      this.validata = false
      this.savingMode = 'Save';
      this.reset();
    }

  }

  updateeligibility: any = false;
  updateapplicants() {
   
    (this.applicantstatus == 'Add') ? this.addapplicants = 'Adding...' : this.addapplicants = 'Removing...';
 
    this.commonservice.postrequest('/placementstatus/updateregisteredmulti', { organisation_id: sessionStorage.getItem("organisation_id"), ...this.companydetails, rollnumbers: this.rollnos, applicantstatus: this.applicantstatus, updateeligibility: this.updateeligibility, mail: sessionStorage.getItem("mail") }).subscribe(
      (res: any) => {
        if (res.message == 'success') {
         
          this.updateeligibility = false
          this.firstcall()
          this.display = true; (this.applicantstatus == 'Add') ? (this.addapplicants = 'ADD', this.popup = "Applicants Added") : (this.addapplicants = 'REMOVE', this.popup = "Applicants Removed"); this.addapplicantdisplay = 'none'
          setTimeout(() => {
            this.display = false;
          }, 5000)
        }
      },
      (err: any) => console.log(err)
    );
  }



 

  @ViewChild('excel')
  public myInputVariable: ElementRef;

  reset() { this.myInputVariable.nativeElement.value = ""; }
 

  saveMode = false

  savingMode = 'Save'
  year = ''
  errorMsg = ''
  validata: any = false

  onfilesubmit1(evt: any) {
   
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(evt.target.files[0]);
    reader.onload = (x: any) => {
      const bstr: string = x.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.keys = this.data.shift();
      if (this.keys.length !== 1) { alert("invalid format"); window.location.reload() }
     
      let data1: any = [];
      this.data.forEach((a: any) => {
        
        if (a.length != 0) {
          data1.push(a)
        }
      })
      this.data = data1
    
      this.mapping = this.data.map((e: any) => {
        if (e.length != 0) {
          let obj: any = {};
          this.keys[0] = 'rollnumber'
          
          this.keys.forEach((key: any, i: any) => {
            let a = (e[i] + '').trim()
            if (a.length != 0 && e[i]) {
             
              obj[key] = e[i];
            }
          });
          return obj;
        }
      });
     
      this.keys.forEach((value: any, key: any) => {
        this.objkey[key] = value.replace(/ /g, ' ')
      });
      this.saveMode = true;
    
      this.rollnos = []
      for (let c of this.mapping) {
        this.rollnos.push((c.rollnumber).toLowerCase())
      }

     
    }
    evt.target.value = ''
  }


  save1() {
    this.validata = true
  }


  exportexcel1(t: any): void {
    const fileName = `sample template to upload students list.xlsx`;
    /* table id is passed over here */
    let element = document.getElementById('excel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  placementcyclename: any = sessionStorage.getItem("placementcyclename")
  companyname: any = sessionStorage.getItem('companyname')
  organisation_id: any = sessionStorage.getItem('organisation_id')

  addIntoLevel(level: any) {
    let index = this.hiringflow.findIndex(e => e.level === level);
    let leveltoadd = this.hiringflow.filter((e: any, i: any) => i <= index)
    let addstudents: any = []
    leveltoadd.forEach((d: any, i: any) => {
      if (this.hiringflow[this.hiringflow.length - 1].level == d.level) {
        this.lastItem = true
      }
      this.rollnos.forEach((c: any) => {
        let data: any = {}
        data.rollnumber = c.toString().toLowerCase()
        data.placementcyclename = this.placementcyclename
        data.companyname = this.companyname
        data.hiringflowname = d.level
        data.organisation_id = this.organisation_id
        data.lastItem = this.lastItem
        addstudents.push(data)
      });

      if (i == leveltoadd.length - 1) {
        this.commonservice.postrequest('/placementstatus/addIntoLevel', addstudents).subscribe(
          (res: any) => {
            if (res.message = "success") {
              this.firstcall()
              this.display = true;
              this.popup = "Applicants Added To " + this.hierarchylevel;
              this.addapplicantdisplay = 'none'
              setTimeout(() => {
                this.display = false;
              }, 5000)
              this.hierarchylevel = ""
            }
          })
      }
    });

  }



  removeIntoLevel(level: any) {
    let index = this.hiringflow.findIndex(e => e.level === level);
    let leveltoremove = this.hiringflow.filter((e: any, i: any) => i >= index)
    let removestudents: any = [];
    leveltoremove.forEach((d: any, i: any) => {
      
      if (this.hiringflow[this.hiringflow.length - 1].level == d.level) {
        this.lastItem = true
      }
      this.rollnos.forEach((c: any) => {
        let data: any = {}
        data.rollnumber = c.toString().toLowerCase()
        data.placementcyclename = this.placementcyclename
        data.companyname = this.companyname
        data.hiringflowname = d.level
        data.organisation_id = this.organisation_id
        data.lastItem = this.lastItem
        removestudents.push(data)
      });
      if (i == leveltoremove.length - 1) {
        this.commonservice.postrequest('/placementstatus/removeIntoLevel', removestudents).subscribe(
          (res: any) => {
            if (res.message = "success") {
              this.firstcall();
              this.display = true;
              this.popup = "Applicants Removed From " + this.hierarchylevel;
              this.addapplicantdisplay = 'none'
              setTimeout(() => {
                this.display = false;
              }, 5000)
              this.hierarchylevel = ''
            }
          })
      }
    });


  }
}
