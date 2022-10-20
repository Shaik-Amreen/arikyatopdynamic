import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
@Component({
  selector: 'app-placements-home',
  templateUrl: './placements-home.component.html',
  styleUrls: ['./placements-home.component.css']
})
export class PlacementsHomeComponent implements OnInit {

  data: any = []; exists = false; previousdata: any = []; display: any = false;
  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService) {
    if (sessionStorage.getItem("successpopup")) {
      this.display = true
      setTimeout(() => {
        this.display = false;
        sessionStorage.removeItem("successpopup")
      }, 5000)
    }
    sessionStorage.removeItem('editplacements')
    sessionStorage.removeItem('editcompany')
    if (sessionStorage.getItem("placementcyclename") != null) { sessionStorage.removeItem("placementcyclename"); }
    this.exists = false;
    this.commonservice.postrequest('/Placement/findPlacement', { organisation_id: sessionStorage.getItem("organisation_id") }).subscribe(
      (res: any) => {
        
        this.data = res.filter((e: any) => new Date(e.todate) > new Date())
        this.previousdata = res.filter((e: any) => new Date(e.todate) <= new Date())
        this.data.reverse(); this.previousdata.reverse()
        this.exists = true
      },
      (err: any) => console.log(err)
    );

  }

  placementdetails(data: any) {
    sessionStorage.setItem("placementcyclename", data.placementcyclename)
    this.router.navigate(['/admin/placements/placementsdetails'])
  }

  scrolltop(){
    document.getElementById('scrtop')?.scrollIntoView({ behavior: "smooth", block: 'center' });
  }

  ngOnInit(): void {
  }

}

