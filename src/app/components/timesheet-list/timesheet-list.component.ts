import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Submission } from '../../../submissins';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})
export class TimesheetListComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) {
    var Uid=this.authService.auth?this.authService.auth.currentUser?.uid?this.authService.auth.currentUser.uid:'':'';

  this.authService.isManager().subscribe(d => {
    if(d && d.find((x: { UserId: any; })=>x.UserId == Uid)){
     
  }
  else this.router.navigate(['/home']);
 }); }
  submissions: Submission[] | undefined;
  

  approve(submission: Submission) {
    submission.approved = true;
  }

  reject(submission: Submission) {
    submission.approved = false;
  }

  ngOnInit(): void {
    this.authService.getSubmissions().subscribe(data=> this.submissions=data )
    this.submissions
  }

}
