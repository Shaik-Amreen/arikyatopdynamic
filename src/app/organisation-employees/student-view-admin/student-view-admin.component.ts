import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-view-admin',
  templateUrl: './student-view-admin.component.html',
  styleUrls: ['./student-view-admin.component.css']
})
export class StudentViewAdminComponent implements OnInit {

 

  navdata: any = [{ label: 'search', rlink: '/admin/student/search' }, { label: 'Add students', rlink: '/admin/student/upload' },
  { label: 'Results', rlink: '/admin/student/results' }, { label: 'Promote', rlink: '/admin/student/promote' },
  { label: 'Demote', rlink: '/admin/student/demote' }, { label: 'Backlogs', rlink: '/admin/student/backlogs' },
  { label: 'Placed', rlink: '/admin/student/placed' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
