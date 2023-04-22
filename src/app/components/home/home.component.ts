import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Submission } from '../../../submissins';

import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  submissionForm: FormGroup;


  user = this.authService.currentUser;
  data: any;

  constructor(private formBuilder: FormBuilder,public authService: AuthenticationService,private toasted: HotToastService) {
    this.submissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      workHoursOrLeaveDay: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    
  }

  onSubmit() {
    const submission: Submission = {
      name: this.submissionForm.value.name,
      date: this.submissionForm.value.date,
      workHoursOrLeaveDay: this.submissionForm.value.workHoursOrLeaveDay,
      startTime: this.submissionForm.value.startTime,
      endTime: this.submissionForm.value.endTime,
      description: this.submissionForm.value.description,
      approved: false
    };
    this.authService.addSubmission(submission);
    this.submissionForm.reset();
  }
}
