import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
@Component({
  selector: 'app-overall-placement-reports',
  templateUrl: './overall-placement-reports.component.html',
  styleUrls: ['./overall-placement-reports.component.css']
})
export class OverallPlacementReportsComponent implements OnInit {

  type: any = ''; status: any = 'ongoing'; placementcycles: any = []; data: any = false; truedata: any = []
  departments: any = ['cse', 'ece', 'eee', 'mech', 'civil', 'cst', 'mba', 'mca']
  category: any = ['eligible', 'addedstudents', 'interested', 'notinterested', 'notaddedstudents', 'placed', 'offered', 'comregister', 'comnotregister']
  companycategory = ["comnotregistercompany", "offeredcompany", "placedcompany", "comregistercompany"]
  campusplacementdata: any = []; campusplacementdatadeptwise: any = {}; companyplacementdata: any = []; companyplacements: any = []
  constructor(private commonservice: CommonService, public ete: ExportExcelService) {

    this.commonservice.postrequest('/Studentdata/dashboardcampusreports', { organisation_id: sessionStorage.getItem('organisation_id') }).subscribe(
      (ress: any) => {

        this.data = true
        this.placementcycles = ress.placementcycles
        ress = ress.response
        this.truedata = ress
        ress.forEach((camp: any) => {
          this.campusplacementdatadeptwise = {}
          this.departments.forEach((depart: any) => {
            let temp: any = {}
            this.category.forEach((cat: any) => {
              temp[cat] = camp[cat].filter((el: any) => el.department == depart)
            })
            this.campusplacementdatadeptwise[depart] = temp
          });

          this.companyplacements = []
          camp.companies.forEach((c: any, i: any) => {
            let comdeptdata: any = {}
            this.departments.forEach((depart: any, id: any) => {
              let tempcom: any = {}
              this.companycategory.forEach((com: any, index: any) => {
             
                tempcom[com] = c[com].filter((el: any) => el.department == depart)
              
                if (index == this.companycategory.length - 1) {
                  comdeptdata[depart] = tempcom
               
                  if (this.departments.length - 1 == id) {
                   
                    comdeptdata.company = c.companyname
                  }
                }
               })});
          
            this.companyplacements = [...this.companyplacements, comdeptdata]
           
          });
          this.campusplacementdatadeptwise.placementcyclename = camp.placementcyclename
          this.campusplacementdatadeptwise.fromdate = camp.fromdate
          this.campusplacementdatadeptwise.todate = camp.todate
          this.campusplacementdatadeptwise.companyplacements = this.companyplacements
          this.campusplacementdata.push(this.campusplacementdatadeptwise)
          this.data = true
         

        });
      })
  }

  ngOnInit(): void {

  }
  tempdatafunc() {
    let te: any;

    if (this.status == 'ongoing') {
      te = this.campusplacementdata.filter((e: any) => (new Date(e.todate) > new Date()));

    }
    else {
      if (this.status != 'all') {
        te = this.campusplacementdata.filter((e: any) => (e.placementcyclename == this.status));
      }
      else { te = this.campusplacementdata }
    }
    return te
  }

  dataForExcel: any = []
  exportexcel(t: any, n: any): void {
    
    const fileName = `${n} Placement Cycle.xlsx`
   
    let element = document.getElementById(`${t}`);
   
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    XLSX.writeFile(wb, fileName);
  }

  tempcompanyfunc(tempcompany: any) {
    let tc: any = tempcompany;
    if (this.type != '') {
      tc = tempcompany.filter((c: any) => c.company.includes(this.type))
    }
    return tc
  }

  exportExcel(templacement: any, companytemp: any) {
    let dataForExcel: any = [];
    let temptruedata = this.truedata.filter((d: any) => templacement.placementcyclename == d.placementcyclename)[0]
    let tempcompanies = temptruedata.companies.filter((t: any) => t.companyname == companytemp.company)
    
    let td: any = []
   
    temptruedata.interested.map((t: any) => (
      (tempcompanies.length > 0) ? (
        td = tempcompanies[0].companyPlacementStatus.filter((doc: any) => doc.rollnumber == t.rollnumber),
        (td.length > 0) ? (
          dataForExcel.push(
            [
              (td[0].placementcyclename == '') ? '-' : td[0].placementcyclename,
              td[0].companyname,
              td[0].mail,
              t.rollnumber,
              t.course,
              t.department,
              'yes',
              (td[0].registered == '') ? '-' : td[0].registered,
              (td[0].rejectedat == '') ? '-' : td[0].rejectedat,
              (td[0].offerstatus == '') ? '-' : td[0].offerstatus,
              (td[0].verifiedoffer == '') ? '-' : td[0].verifiedoffer,
              (td[0].package == '') ? '-' : td[0].package,
              (td[0].placed == '') ? '-' : td[0].placed,
              t.firstname + t.middlename + t.lastname,

            ]
          )
        ) :
          dataForExcel.push(
            [
              templacement.placementcyclename,
              companytemp.company,
              t.mail,
              t.rollnumber,
              t.course,
              t.department,

              '-',
              '-',
              '-',
              '-',
              '-',
              '-',
              '-',
              t.firstname + t.middlename + t.lastname,

            ])
      ) : null
    ))
   
    let reportData = {
      title: templacement.placementcyclename.toUpperCase() + " " + companytemp.company.toUpperCase() + ' STATUS ',
      data: dataForExcel,
      headers: [
        "Placement cycle name",
        "Company name",
        "Mail",
        "Roll number",
        "Course",
        'Department',
        "Eligible",
        "Registered",
        "Rejected in",
        "Offer status",
        "Verified offer",
        "Package",
        "Placed",
        "Full Name",
      ],
      backAlpha: 'N3'
    }

    this.ete.exportExcel(reportData);

  }







}
