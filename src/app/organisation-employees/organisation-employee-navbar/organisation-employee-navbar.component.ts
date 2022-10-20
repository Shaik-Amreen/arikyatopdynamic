import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-organisation-employee-navbar',
  templateUrl: './organisation-employee-navbar.component.html',
  styleUrls: ['./organisation-employee-navbar.component.css']
})
export class OrganisationEmployeeNavbarComponent implements OnInit {

  navMode = true;
  firstname = ''; show = false; all: any = []; notyet: any = []; shownot = false
  collegeName: any = ''
  content: any =
    [
      { label: "Home", rlink: "/admin/home", icon: 'bx bxs-home' },
      {
        label: "Dashboard", rlink: "/admin/dashboard", icon: 'bx bx-bar-chart',
        submenu: [
          { label: "Training", rlink: "/admin/dashboard/training" },
          { label: "Placements", rlink: "/admin/dashboard/placements" },
        ]
      },
      {
        label: "Students", rlink: "/admin/student", icon: 'bx bxs-group',
        submenu: [
          { label: "Search", rlink: "/admin/student/search" },
          { label: "Add students ", rlink: "/admin/student/upload" },
          { label: "Results", rlink: "/admin/student/results" },
          { label: "Promote", rlink: "/admin/student/promote" },
          { label: "Demote", rlink: "/admin/student/demote" },
          { label: "Backlogs", rlink: "/admin/student/backlogs" },
          { label: "Placed", rlink: "/admin/student/placed" },
        ]
      },
      { label: "Placements", rlink: "/admin/placements", icon: 'bx bxs-graduation' },
      { label: "Companies", rlink: "/admin/companies", icon: 'bx bx-buildings' },
      {
        label: "Quiz", rlink: ["/admin/quiz"], icon: 'bx bx-notepad',
        submenu: [
          { label: "Topics", rlink: ["/admin/quiz/topics"] },
          { label: "Add", rlink: ["/admin/quiz/add"] },]
      },
      {
        label: "Coding", rlink: ["/admin/code"], icon: 'bx bx-laptop',
        submenu: [
          { label: "Topics", rlink: ["/admin/code/topics"] },
          { label: "Add", rlink: ["/admin/code/add"] },]
      },

      {
        label: "Reports", rlink: "/admin/reports", icon: 'bx bx-receipt',
        submenu: [
          { label: "Training", rlink: "/admin/reports/training/overallreport" },
          { label: "Placements", rlink: "/admin/reports/placements" },
        ]
      },
      { label: "Offer status", rlink: "/admin/offerstatus", icon: 'bx bxs-user' },
      { label: "Users", rlink: "/admin/users", icon: 'bx bxs-user' },
      { label: "Calendar", rlink: "/admin/calendar", icon: 'bx bx-calendar' },
    ]

  fullname: any = ''
  mail = sessionStorage.getItem('mail')
  role: any = ''
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {


    this.commonservice.postrequest('/facultydetails/findoneAdmin', { organisation_id: sessionStorage.getItem("organisation_id"), 'mail': this.mail }).subscribe(
      (res: any) => {
       
        if (res.admindata == null) { this.router.navigate(['/login']) }
        this.role = res.admindata.role
        sessionStorage.setItem('role', this.role)
        if (res.admindata.role != 'admin' && res.admindata.role != 'technicaltrainer') { this.router.navigate(['/login']) }
        if (this.role == 'technicaltrainer') {
          this.router.navigate(['/admin/dashboard'])
          this.content = [
            {
              label: "Dashboard", rlink: "/admin/dashboard", icon: 'bx bx-bar-chart',
              submenu: [
                { label: "Training", rlink: "/admin/dashboard/training" },

              ]
            },
            {
              label: "Students", rlink: "/admin/student", icon: 'bx bxs-group',
              submenu: [
                { label: "Search", rlink: "/admin/student/search" },
              ]
            },
            {
              label: "Quiz", rlink: ["/admin/quiz"], icon: 'bx bx-notepad',
              submenu: [
                { label: "Topics", rlink: ["/admin/quiz/topics"] },
                { label: "Add", rlink: ["/admin/quiz/add"] },]
            },
            {
              label: "Coding", rlink: ["/admin/code"], icon: 'bx bx-laptop',
              submenu: [
                { label: "Topics", rlink: ["/admin/code/topics"] },
                { label: "Add", rlink: ["/admin/code/add"] },]
            },
            {
              label: "Reports", rlink: "/admin/reports", icon: 'bx bx-receipt',
              submenu: [
                { label: "Training", rlink: "/admin/reports/training/overallreport" },
              ]
            },
            { label: "Calendar", rlink: "/admin/calendar", icon: 'bx bx-calendar' },
          ]
        }

        this.firstname = res.admindata.firstname; sessionStorage.setItem('firstname', this.firstname)
        this.fullname = res.admindata.firstname + res.admindata.middlename + res.admindata.lastname
      },
      (err: any) => this.router.navigate(['/login'])
    );
    this.commonservice.postrequest('/verify', 'verify').subscribe(
      (res: any) => {
        (res.status !== 'success') ? this.router.navigate(['/login']) : null
      },
      (err: any) => this.router.navigate(['/login'])
    );
  }

  placenotify: any = []

  ngOnInit(): void {
    this.commonservice.postrequest('/data/findcollegename', { organisation_id: sessionStorage.getItem('organisation_id') }).subscribe(
      (res: any) => {
        this.collegeName = res.organisation
      },
      (err: any) => this.router.navigate(['/login'])
    );
    this.allbell()
    this.allenvelop()
    this.alloffers()
  }
  perform() {
    sessionStorage.removeItem('editcode')
    sessionStorage.removeItem('editquiz')
  }


  allbell() {
    this.commonservice.postrequest('/placementstatus/notifyacceptreject', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => {
        this.comnotify = res.data1
        this.comnotify = this.comnotify.filter((e: any) => e.offerletter != '-')
        this.placenotify = res.data2
      
      },
      (err: any) => console.log(err)
    );
  }

  allenvelop() {
    this.commonservice.postrequest('/notification/findnotifications', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => {
        this.notyet = res.filter((e: any) => e.verified == 'notyet')
        res.forEach((e: any) => {
          (e.verifiedbymail == sessionStorage.getItem('mail')) ? e.verifiedby = 'You' : null
        });
        this.all = res
      
      },
      (err: any) => console.log(err)
    );
  }

  alloffers() {
    this.commonservice.postrequest('/notification/findadminoti', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => {
       
        res.forEach((e: any) => {
          (e.doneby == sessionStorage.getItem('mail')) ? e.firstname = 'You' : null
        });
        this.adminotifications = res
        
      },
      (err: any) => console.log(err)
    );
  }
  expandArrow(e: any) {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
    let lowParent = e.target.parentElement;
    lowParent.classList.toggle("lowParentClass")
  }
  setedit() {
    sessionStorage.setItem("adminedit", "true")
  }
  setprofile() {
    sessionStorage.removeItem("adminedit")
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/arikya'])
  }

  det() {
    this.shownot = !this.shownot;
    this.show = false;
    this.showadminoti = false
    this.showcomnot = false

  }
  adminotifications: any = [];
  showadminoti = false

  admindet() {
    this.showadminoti = !this.showadminoti;
    this.show = false
    this.shownot = false;
    this.showcomnot = false
  }

  comnotify: any = [];
  showcomnot = false;
  comdet() {
    this.showcomnot = !this.showcomnot;
    this.show = false;
    this.showadminoti = false

  }
  changeNav() {
    this.navMode = !this.navMode
  }

  data: any
  accept(c: any, d: any) {
    let check = this.notyet.filter((n: any) => n.rollnumber == c.rollnumber)
    c.verified = d
    c.verifiedby = sessionStorage.getItem('firstname')
    c.verifiedbymail = sessionStorage.getItem('mail')
    this.data = { mail: c.mail, organisation_id: c.organisation_id, verified: 'no' }

    if (d == 'accepted') {
      let field = c.field
      let value = c.current
      this.data[field] = value
      if (check.length == 1) { this.data.verified = 'yes' }
    }
    this.commonservice.postrequest('/Studentdata/updatestudentdatac',
      this.data).subscribe(
        (res: any) => {
          if (res.message == "success") {
            this.allenvelop()
          
          }
        })


    this.commonservice.postrequest('/notification/updatenotifications', c).subscribe(
      (res: any) => { },
      (err: any) => console.log(err)
    );
  }

  download(c: any) {
    const source = `data:application/pdf;base64,${c.offerletter}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${c.rollnumber} ${c.companyname} offerleter.pdf`
    link.click();
  }

  acceptnot(c: any, d: any) {
    c.verifiedoffer = d
    this.commonservice.postrequest('/placementstatus/adminplaced', c).subscribe(
      (res: any) => {

      },
      (err: any) => console.log(err)
    );
  }


}
